import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import Images from '../../../Helper/Images';
import * as Animatable from 'react-native-animatable';
import { useResponsiveSizes } from "react-native-responsive-sizes";

const BoxBackground = ({ marginTop, isAnimatedScreen, children }) => {
  const responsive = useResponsiveSizes();
  return (
    <View pointerEvents={isAnimatedScreen ? "none" : "auto"} style={styles.mainContainer}>
      <View style={styles.behindContainer}>
        <Animatable.Image animation="pulse" easing={'ease-out-sine'} iterationCount="infinite" source={Images.blurTopRight} defaultSource={Images.blurTopRight} style={styles.rightTop(responsive)} />
      </View>
      <View style={styles.safeAreaConatiner}>
        <View style={styles.viewContainer(responsive,marginTop)}>
          <Image source={Images.PATHBG} defaultSource={Images.PATHBG} style={styles.leftTop(responsive)} resizeMode='stretch' />
          {children}
        </View>
      </View>
    </View>

  )
};
export default BoxBackground;
