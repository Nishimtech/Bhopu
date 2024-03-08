import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useResponsiveSizes } from '../../Home';
import styles from './styles';

const Pagination = (props) => {
  const responsive = useResponsiveSizes();
  var scrollViewRef = useRef(null);
  const [index, setIndex] = useState(0)
  const renderPagination = ({ item, index }) => {
    return <View style={styles.viewPaginationDot(responsive, index == props.currentPagination)} />

  }

  const onPageChange = () => {
    setTimeout(() => {
      const isGreater = index > props.currentPagination
      setIndex(props.currentPagination)
      if (props.currentPagination % 3 == 0) {
        scrollViewRef.current.scrollToIndex({
          index: props.currentPagination,
          animated: true,
        });
      }
      else if (isGreater) {
        scrollViewRef.current.scrollToIndex({
          index: props.currentPagination > 2 ? props.currentPagination - 1 : 0,
          animated: true,
        });
      }
    }, 200)
  }

  useEffect(() => {
    onPageChange()
  }, [props.currentPagination])


  return (
    <View style={{ width: responsive.size(80), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: responsive.size(15) }}>
      <FlatList
        ref={scrollViewRef}
        data={new Array(props.length)}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderPagination}
        flatListRef={React.createRef()}
        initialScrollIndex={props.currentPagination}
        getItemLayout={(_, index) => ({
          length: responsive.size(8) + responsive.size(4), 
          offset: (responsive.size(8) + responsive.size(4)) * (index), 
          index,
        })}
      />
    </View>

  )
};
export default Pagination;
