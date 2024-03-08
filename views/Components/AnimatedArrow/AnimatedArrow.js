import React, { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Images,useResponsiveSizes } from '../../Home';
import styles from './styles';
const AnimatedArrow = ({is_down=false,is_animated=false}) => {
  const responsive = useResponsiveSizes();
  const [topAnim] = useState(new Animated.Value(10))
  const [topAnim1] = useState(new Animated.Value(10))
  const [topAnim2] = useState(new Animated.Value(10))
  useEffect(()=>{
    animate()
  },[])
  const animate=()=>{
    if(is_animated){
      Animated.parallel([
        Animated.timing(topAnim, { toValue: 0, duration: 800, easing: Easing.linear }),
        Animated.timing(topAnim1, { toValue: 0, duration: 900, easing: Easing.linear }),
        Animated.timing(topAnim2, { toValue: 0, duration: 1200, easing: Easing.linear }),
      ]).start(() => {
          Animated.parallel([
            Animated.timing(topAnim, { toValue: 10, duration: 0, easing: Easing.linear }),
            Animated.timing(topAnim1, { toValue: 10, duration: 0, easing: Easing.linear }),
            Animated.timing(topAnim2, { toValue: 10, duration: 0, easing: Easing.linear }),
          ]).start(() => {
            animate()
          });
      });
    }
  }
  return (
    <View style={styles.container(responsive, is_down)}> 
        <Animated.Image style={styles.image(is_animated, topAnim, is_down, responsive)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
        <Animated.Image style={styles.image(is_animated, topAnim1, is_down, responsive)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
        <Animated.Image style={styles.image(is_animated, topAnim2, is_down, responsive)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
     </View>

  )
};
export default AnimatedArrow;
