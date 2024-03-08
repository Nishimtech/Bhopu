import React, { useState, useEffect, Fragment } from 'react';
import { BackHandler, View, Animated, Easing, Image } from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import { Constant, Images, MainBackground, useResponsiveSizes } from '..';

const HowToPlay = (props) => {
  const responsive = useResponsiveSizes();
  const [backPos] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [isAnimatedScreen, setAnimatedScreen] = useState(true)
  const [selectIdx, setIndex] = useState(0)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () { return false; });
    return (() => {
      backHandler.remove()
    })
  }, [])

  const loadAnimation = (value) => {
    setAnimatedScreen(true)
    Animated.parallel([
      Animated.timing(backPos, { toValue: value, duration: 400, easing: Easing.linear }),
    ]).start(setAnimatedScreen(false));
  }
  const backAction = async () => {
    props.navigation.goBack()
  }
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item} defaultSource={item} />
      </View>
    )
  }
  return (
    <MainBackground title={'How to play'} isAnimatedScreen={isAnimatedScreen} isAnimated={true} backPos={backPos} isCross={true} backAction={backAction} loadAnimation={loadAnimation}>
          <View style={styles.header_container}>
            <Animated.View style={[styles.form_container(responsive), { marginTop: backPos }]}>
              <Carousel
                data={[Images.HTP1, Images.HTP2, Images.HTP3, Images.HTP4]}
                renderItem={_renderItem}
                onSnapToItem={(val) => setIndex(val)}
                sliderWidth={Constant.FULL_WIDTH}
                itemWidth={Constant.FULL_WIDTH}
              />
            </Animated.View>
          </View>
          <Animatable.View pointerEvents='none' duration={350} iterationCount={1} animation={"fadeInUpBig"} easing={'ease-out-sine'} style={styles.bottomView(responsive)}>
            <Image style={styles.left_pos(responsive)} source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} />
            <View style={styles.viewPagerContainer(responsive)}>
              <View style={styles.viewPage(responsive,selectIdx,0)} />
              <View style={styles.viewPage(responsive,selectIdx,1)} />
              <View style={styles.viewPage(responsive,selectIdx,2)} />
              <View style={styles.viewPage(responsive,selectIdx,3)} />
            </View>
            <Image style={styles.right_pos(responsive)} source={Images.RIGHT_VERTICAL} defaultSource={Images.RIGHT_VERTICAL} />
          </Animatable.View>
    </MainBackground>
  )

};
export default HowToPlay;
