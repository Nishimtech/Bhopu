import React, { Fragment, useEffect, useState } from 'react';
import { Animated, Easing, Image, TouchableOpacity, View, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import Images from '../../../Helper/Images';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import { DailyCheckIn, GradientView } from '..';
import { Constant, Core } from '../../Home';

const HomeBackground = ({ isHomeVisible,notificationCount = 0, real_amount, isRightIcon, isRightIcon1, ic_sports, sportsData, isReset, isLeftIcon, isHomeIcon, isBack, backPos, title = '', subtitle = '', isCross, loadAnimation, backAction, isNotification, rightAction, isHeaderBorder = true, children, isInfo }) => {
  const responsive = useResponsiveSizes();
  const [opacityAnim] = useState(new Animated.Value(1))
  const [enable, setEnable] = useState(false)
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, { toValue: 1, duration: 100, easing: Easing.linear, useNativeDriver: true }),
    ]).start(() => { if (loadAnimation) { loadAnimation(0, 0) } });
  }, [])
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.behindContainer}>
        <Image source={Images.blurTopRight} defaultSource={Images.blurTopRight} style={styles.rightTop(responsive)} />
        <Image source={Images.bottomLeft} defaultSource={Images.bottomLeft} style={styles.bottonLeft(responsive)} />
      </View>
      {
        Platform.OS == 'ios' &&
          <View style={styles.heightStatusBar(responsive)} />
      }
      {
        !isHomeVisible &&
        <Animated.View style={styles.headerContainer(opacityAnim, responsive, isHeaderBorder)}>
          {
            isLeftIcon &&
            <Animated.View style={styles.backContainer(backPos, responsive)}>
              {
                ic_sports ?
                  <GradientView colors={[Core.radical_red, Core.Bracket]} styles={styles.viewSports(responsive)}>
                    <Text style={styles.txtSport(responsive)}>{sportsData ? sportsData.sports_name : '--'}</Text>
                  </GradientView>
                  :
                  <TouchableOpacity onPress={backAction} style={styles.backTouchAction}>
                    <Image style={styles.bgBack} source={Images.VIEW_ARROW} defaultSource={Images.VIEW_ARROW} />
                    {
                      isBack ?
                        <Image style={styles.ic_back} source={Images.ARROW} defaultSource={Images.ARROW} />
                        : isHomeIcon ?
                          <Image style={[styles.ic_back, styles.activeColor]} source={Images.BURGER} defaultSource={Images.BURGER} />
                          : isReset &&
                          <Image style={[styles.ic_back, styles.activeColor]} source={Images.RESET} defaultSource={Images.RESET} />

                    }
                  </TouchableOpacity>
              }
            </Animated.View>
          }
          <Fragment>
            {
              title != '' ?
                <Text style={styles.txtTitle(responsive)}>{title}</Text>
                :
                <Image style={styles.logoSize(responsive)} source={Images.LOGO} defaultSource={Images.LOGO} />
            }
            {
              subtitle != '' &&
              <Text style={styles.txtsubTitle(responsive)}>{subtitle}</Text>
            }
          </Fragment>

          <>
            {
              isRightIcon1 &&
                <GradientView colors={['#555B64','rgba(85, 91, 100, 0.33) 100%)']} styles={{position:'absolute',alignItems:'center',justifyContent:'center',right:responsive.size(58), top:responsive.size(Platform.OS=='android'?28:18),minWidth:responsive.size(50),height:responsive.size(26),borderRadius:responsive.size(60),paddingHorizontal:5}}>
                      <Text style={{fontSize:responsive.size(12),fontFamily:'Saira-Medium',textAlign:'center',color:'#FAD60C'}}>${parseFloat(real_amount)}</Text>
                </GradientView>
            }
          
            {
              isRightIcon &&
              <Animated.View style={styles.rightContainer(backPos, responsive)}>
                  <TouchableOpacity onPress={rightAction} style={styles.backTouchAction}>
                  {
                    !isNotification &&
                    <Image style={styles.bgBack} source={Images.VIEW_ARROW} defaultSource={Images.VIEW_ARROW} />
                  }
                    { isCross ?
                      <Image style={styles.ic_back} source={Images.IC_ClOSE} defaultSource={Images.IC_ClOSE} />
                      : isInfo ? <Image source={Images.IC_INFO} defaultSource={Images.IC_INFO}  />
                      :isNotification &&
                      <View>
                        <Image style={styles.ic_back} source={Images.IC_NOTIFICATION} defaultSource={Images.IC_NOTIFICATION} />
                        {
                          notificationCount > 0 &&
                          <View style={styles.viewCount(responsive)} />
                        }
                      </View>
                  }
                </TouchableOpacity>
              </Animated.View>
            }
          </>
        </Animated.View>
      }
      <View style={styles.homeContainer}>
        {children}
      </View>
      <DailyCheckIn enable={enable} ismissOnTouchOutside={false} setEnable={setEnable} />
    </SafeAreaView>

  )
};
export default HomeBackground;
