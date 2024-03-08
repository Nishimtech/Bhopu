import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Easing, View, Animated, Platform } from 'react-native';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import { API, Constant, Utils } from '../../Home';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const Advertisement = ({ loadAPIRemains,tabIdx,selected_sports, navigation }) => {
  const responsive = useResponsiveSizes();
  const [topAnim] = useState(new Animated.Value(responsive.size(-84)))
  const [arrOfAdvertisment, setDataAdverisment] = useState([])
  const [selectIdx, setIndex] = useState(0)
  const [noRecordFound, setNoRecord] = useState(false)

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

  useEffect(() => {
    if (selected_sports && tabIdx == 1) {
      setDataAdverisment([])
      setIndex(0)
      API.GET_ADVERTISEMENT(selected_sports?.sports_id).then(async (response) => {
        let result = response.data;
        if(Platform.OS == 'ios'){
          Utils.enableAnimation(400,2)
        }
        setDataAdverisment(result)
        setNoRecord(result.length == 0)
        Animated.parallel([
          Animated.timing(topAnim, { toValue: result.length == 0 ? responsive.size(-84) : responsive.size(20), duration: 600, easing: Easing.cubic }),
        ]).start(()=>{
          loadAPIRemains()
        });
      }).catch(error => {
        setNoRecord(true)
        Utils.handleCatchError(error, navigation)
        return error;
      });
    }
  }, [selected_sports,tabIdx])
  const _renderItem = ({ item,idx }) => {
    return (
      <FastImage testID={idx} style={styles.imgContainer} source={{ uri: item.image, priority: FastImage.priority.high, cacheControl: FastImage.priority.cacheOnly }} />
    )
  }
  const onSnapToItem = async (index) => {
    setIndex(index)
  }
  const ViewCarasoul = useMemo(() => {
    let colors = ['rgba(255,255,255,0.1)','rgba(153,153,153,0.1)'];
    return (
      <ShimmerPlaceholder location={[0,1]} shimmerColors={colors} style={styles.shimmerContainer(responsive)} autoRun visible={arrOfAdvertisment.length > 0}>
        <Carousel
          autoplay={true}
          loop={tabIdx == 1}
          ref={(c) => { _carousel = c }}
          activeSlideAlignment={'center'}
          data={arrOfAdvertisment}
          renderItem={_renderItem}
          sliderWidth={Constant.FULL_WIDTH - responsive.size(32)}
          itemWidth={Constant.FULL_WIDTH - responsive.size(32)}
          inactiveSlideOpacity={0.7}
          onSnapToItem={(index) => onSnapToItem(index)}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
      </ShimmerPlaceholder>
    );
  }, [arrOfAdvertisment]);
  const opacity = topAnim.interpolate({ inputRange: [-responsive.size(90), 0], outputRange: [0, 1] });
  return (
    <Animated.View key={tabIdx+(selected_sports?.sports_id || 0)} style={styles.viewPagerContainer(responsive, noRecordFound, topAnim, opacity)}>
      {
        !noRecordFound &&
        <Fragment>
          {ViewCarasoul}
          <View style={styles.viewPager(responsive, arrOfAdvertisment)}>
            {
              arrOfAdvertisment.map((e, idx) => {
                return (<View style={styles.viewCrcl(responsive, selectIdx, idx)} />)
              })
            }
          </View>
        </Fragment>
      }
    </Animated.View>
  )

};
export default Advertisement;
