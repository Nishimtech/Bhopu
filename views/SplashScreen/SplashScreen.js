import React, { useEffect, useState } from 'react';
import {MainBackground} from '../Components';
import * as Animatable from 'react-native-animatable';
import {Constant, Images, Utils} from '../../Helper';
import styles from './styles';
import AppPreferences from '../../Preferences/AppPreferences';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import { useResponsiveSizes } from "react-native-responsive-sizes";


const SplashScreen = (props) => {
  const responsive = useResponsiveSizes();
  const [isContentLoading, setContentLoading] = useState(false)
  useEffect(()=>{
      setTimeout(() => {
        Utils.enableAnimation(1000)
        setContentLoading(true)
        setTimeout(() => {
          getPrefVariables()
        }, 1000);
      }, 2500);
    
  },[])
  const getPrefVariables=async()=>{
      await Promise.all([
        AppPreferences.getItem(PreferenceConstant.IS_LOGIN),
        AppPreferences.getItem(PreferenceConstant.SESSION_KEY),
        AppPreferences.getItem(PreferenceConstant.SPORTS_HUB),
      ]).then(async(dictObj) => {
        if(dictObj[0] == null || dictObj[1] == null){
          Utils.navToRoot('LoginScreen',props.navigation)
        }else{
          Constant.SESSION_KEY = dictObj[1];
          if(dictObj[2] == null){
            Utils.navToRoot('LandingScreen',props.navigation)
          }else{
            Utils.navToRoot('HomeScreen',props.navigation)
          }
        }
      })
  }
  return (
      <MainBackground isLoading={isContentLoading} isSplashScreen={true}>
          <Animatable.Image duration={2000} animation='flipInY' easing={'ease-out-sine'} style={styles.logoSize(isContentLoading,responsive)} source={Images.LOGO} defaultSource={Images.LOGO} />
      </MainBackground>
  )
};
export default SplashScreen;
