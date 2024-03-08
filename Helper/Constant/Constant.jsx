import { Dimensions, Platform, StatusBar } from "react-native";
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios'
  ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
  : false;
const Constant = {
  APP_TYPE: '3',
  USER_AGENT: "userAgentandroid-app Chrome/56.0.0.0 Mobile Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wV) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36",
  FULL_HEIGHT: height,
  FULL_WIDTH: width,
  DEVICE_TYPE: Platform.OS == 'ios' ? '2' : '1',
  DEVICE_ID: '12345',
  OTP_TIMER: 30,
  SUCCESS_STATUS: 200,
  SESSION_KEY:'',
  BASE_SIZE:14,

}

export default Constant;
