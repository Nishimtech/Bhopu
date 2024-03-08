import React, { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Images,useResponsiveSizes } from '../../Home';
import styles from './styles';
const AnimatedHArrow = ({is_down=false,small=false,is_animated=false}) => {
  const responsive = useResponsiveSizes();
  const [topAnim] = useState(new Animated.Value(20))
  const [topAnim1] = useState(new Animated.Value(20))
  const [topAnim2] = useState(new Animated.Value(20))
  const [topAnim3] = useState(new Animated.Value(20))
  const [topAnim4] = useState(new Animated.Value(20))
  useEffect(()=>{
    animate()
  },[])
  const animate=()=>{
    if(is_animated){
      Animated.parallel([
        Animated.timing(topAnim, { toValue: 0, duration: 900, easing: Easing.linear }),
        Animated.timing(topAnim1, { toValue: 0, duration: 950, easing: Easing.linear }),
        Animated.timing(topAnim2, { toValue: 0, duration: 1000, easing: Easing.linear }),
        Animated.timing(topAnim3, { toValue: 0, duration: 1050, easing: Easing.linear }),
        Animated.timing(topAnim4, { toValue: 0, duration:1100, easing: Easing.linear }),
      ]).start(() => {
          Animated.parallel([
            Animated.timing(topAnim, { toValue: 20, duration: 0, easing: Easing.linear }),
            Animated.timing(topAnim1, { toValue: 20, duration: 0, easing: Easing.linear }),
            Animated.timing(topAnim2, { toValue: 20, duration: 0, easing: Easing.linear }),
            Animated.timing(topAnim3, { toValue: 20, duration: 0, easing: Easing.linear }),
            Animated.timing(topAnim4, { toValue: 20, duration: 0, easing: Easing.linear }),
          ]).start(() => {
            animate()
          });
      });
    }
  }
  return (
     <View style={styles.container(responsive)}> 
        <View style={styles.wrapper}> 
            <Animated.Image style={styles.image(is_animated, topAnim, is_down, responsive,small)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
            <Animated.Image style={styles.image(is_animated, topAnim1, is_down, responsive,small)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
            <Animated.Image style={styles.image(is_animated, topAnim2, is_down, responsive,small)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
            <Animated.Image style={styles.image(is_animated, topAnim3, is_down, responsive,small)} source={Images.IC_ARROW} defaultSource={Images.IC_ARROW} />
        </View>
     </View>

  )
};
export default AnimatedHArrow;
