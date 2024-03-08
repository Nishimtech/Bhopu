import React, { Fragment, useEffect, useState } from 'react';
import { Animated, Image, TouchableOpacity, View,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Images from '../../../Helper/Images';
import * as Animatable from 'react-native-animatable';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import GradientView from '../GradientView';

const MainBackground = ({isSkip,isBack,backPos,title='',isCross,backAction,isAnimatedScreen,isAnimated,loadAnimation,isSplashScreen,children,isLoading,rightAction}) => {
  const responsive = useResponsiveSizes();
  const [isContentLoading, setContentLoading] = useState(!isAnimated)

  useEffect(()=>{
    if(isContentLoading && loadAnimation){
      loadAnimation(0,0)
    }
  },[isContentLoading])

  return (
    <View pointerEvents={isAnimatedScreen?"none":"auto"} style={styles.mainContainer}>
      <View style={styles.behindContainer}>
        <Animatable.Image animation="pulse" easing={'ease-out-sine'} iterationCount="infinite" source={Images.blurTopRight} defaultSource={Images.blurTopRight} style={styles.rightTop(responsive)} />
        {isSplashScreen && <Image source={Images.bottomLeft} defaultSource={Images.bottomLeft} style={styles.bottonLeft} />}
      </View>
      {
        !isSplashScreen ?
          <Fragment>
            <SafeAreaView style={styles.safeAreaConatiner}>
            <View style={styles.headerContainer(responsive)}>
              {
                isBack &&
                  <Animated.View style={styles.backContainer(backPos,responsive)}>
                      <TouchableOpacity onPress={backAction} style={styles.backTouchAction}>
                          <Image style={styles.bgBack} source={Images.VIEW_ARROW} defaultSource={Images.VIEW_ARROW} />
                          <Image style={styles.ic_back} source={Images.ARROW} defaultSource={Images.ARROW} />
                      </TouchableOpacity>
                  </Animated.View>
              }
              {
                title != ''?
                <Text style={styles.txtTitle(responsive)}>{title}</Text>
                :
                <Image style={styles.logoSize(responsive)} source={Images.LOGO} defaultSource={Images.LOGO} />
              }
              {
                isSkip ?
                      <TouchableOpacity onPress={rightAction} style={{position:'absolute',alignItems:'center',justifyContent:'center',right:responsive.size(15), top:responsive.size(Platform.OS=='android'?28:18),width:responsive.size(50),height:responsive.size(26),borderRadius:responsive.size(60),overflow:'hidden'}}>
                        <GradientView colors={['#555B64','rgba(85, 91, 100, 0.33) 100%)']} styles={{alignItems:'center',justifyContent:'center',width:responsive.size(50),height:responsive.size(26)}}>
                          <Text style={{fontSize:responsive.size(12),fontFamily:'Saira-Medium',textAlign:'center',color:'#FAD60C'}}>Skip</Text>
                        </GradientView>
                      </TouchableOpacity>
                :isCross &&
                  <Animated.View style={styles.rightContainer(backPos,responsive)}>
                      <TouchableOpacity onPress={backAction} style={styles.backTouchAction}>
                          <Image style={styles.bgBack} source={Images.VIEW_ARROW} defaultSource={Images.VIEW_ARROW} />
                          <Image style={styles.ic_back} source={Images.IC_ClOSE} defaultSource={Images.IC_ClOSE} />
                      </TouchableOpacity>
                  </Animated.View>
              }
            </View>
              <View style={styles.mainBGContainer(responsive)}>
                {
                  isAnimated ?
                  <Animatable.Image duration={800} onAnimationEnd={()=>setContentLoading(true)} animation='fadeInUpBig' easing={'ease-out-sine'} source={Images.PATHBG} defaultSource={Images.PATHBG} style={styles.leftTop(responsive)} resizeMode='stretch' />
                  :
                  <Image source={Images.PATHBG} defaultSource={Images.PATHBG} style={styles.leftTop(responsive)} resizeMode='stretch' />
                }
                {isContentLoading && children}
              </View>
            </SafeAreaView>
          </Fragment>
          :
          <SafeAreaView style={styles.safeAreaSplashConatiner(isLoading)}>
            {children}
          </SafeAreaView>
      }
    </View>

  )
};
export default MainBackground;
