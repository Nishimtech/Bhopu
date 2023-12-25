import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const CarouselData = ({item, renderItem}) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
    <Carousel
    loop
    width={width}
    height={width / 2}
    autoPlay={true}
    data={item}
    renderItem={renderItem}
  />
    </View>
  );
};

export default CarouselData;