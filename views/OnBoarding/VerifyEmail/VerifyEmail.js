import React, { useState, useEffect, useRef, Fragment } from 'react';
import { KeyboardAvoidingView, Platform, Text, View, Animated, TouchableOpacity, Easing, Image, Clipboard, ActivityIndicator, BackHandler, Keyboard } from 'react-native';
import { MainBackground } from '../../Components';
import styles from './styles';
import ListView from "deprecated-react-native-listview";
import * as Animatable from 'react-native-animatable';
import { API, Constant, Core, Images, Utils } from '../../../Helper';
import LinearGradient from 'react-native-linear-gradient'
import { EventRegister } from 'react-native-event-listeners'
import OTPTextView from 'react-native-otp-textinput';
import AppPreferences from '../../../Preferences/AppPreferences';
import PreferenceConstant from '../../../Preferences/PreferenceConstant';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import md5 from "react-native-md5";

const VerifyEmail = (props) => {
  const responsive = useResponsiveSizes();
  const [heaadingPos] = useState(new Animated.Value(responsive.size(750)))
  const [otpAnim] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [btnLoginAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [btnPrivacyAnim] = useState(new Animated.Value(-Constant.FULL_HEIGHT))
  const [bottomAnim] = useState(new Animated.Value(0))
  const [isAnimatedScreen, setAnimatedScreen] = useState(true)
  const [apiCalling, setApiCalling] = useState(false)
  const username = props.route?.params?.username || '';
  const email = props.route?.params?.email || '';
  const password = props.route?.params?.password || '';
  const refferal = props.route?.params?.refferal || '';

  const input = useRef < OTPTextView > (null);
  const [otp, setOtpInput] = useState("");
  const [otp_timer, setOTPTimer] = useState(Constant.OTP_TIMER);
  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });

  useEffect(() => {
    const keyboardVisibleListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      handleKeyboardVisible
    );
    const keyboardHiddenListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      handleKeyboardHidden
    );

    return () => {
      keyboardHiddenListener.remove();
      keyboardVisibleListener.remove();
    };
  }, []);
  const handleKeyboardVisible = (event) => {
    Animated.timing(bottomAnim, { toValue: -event.endCoordinates.height, duration: event.duration, easing: Easing.linear }).start()
  };
  const handleKeyboardHidden = (event) => {
    Animated.timing(bottomAnim, { toValue: 0, duration: event.duration, easing: Easing.linear }).start()
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return (() => {
      backHandler.remove()
    })
  }, [])
  useEffect(() => {
    if (otp_timer != 0) {
      setTimeout(() => {
        var timeCount = otp_timer;
        if (timeCount > 10) {
          timeCount = timeCount - 1;
        } else {
          timeCount = addZero(timeCount - 1);
        }
        if (timeCount == 0) {
          setOTPTimer(0)
        } else {
          setOTPTimer(timeCount)
        }
      }, 1000);
    }
  }, [otp_timer])
  const addZero = (timeCount) => {
    if (timeCount == 0) {
      return timeCount;
    } else {
      return '0' + timeCount;
    }
  }

  const loadAnimation = (value, value1, value2 = 0) => {
    setAnimatedScreen(true)
    Animated.parallel([
      Animated.timing(heaadingPos, { toValue: value2, duration: 600, easing: Easing.linear }),
      Animated.timing(otpAnim, { toValue: value1, duration: 800, easing: Easing.linear }),
      Animated.timing(btnLoginAnim, { toValue: value, duration: 1000, easing: Easing.linear }),
      Animated.timing(btnPrivacyAnim, { toValue: -value, duration: 1200, easing: Easing.linear }),
    ]).start();
    setTimeout(() => {
      setAnimatedScreen(false)
    }, 800);
  }
  const backAction = async () => {
    await loadAnimation(Constant.FULL_HEIGHT, Constant.FULL_WIDTH, responsive.size(750))
    setTimeout(() => {
      EventRegister.emit('goBackSignup')
      props.navigation.goBack()
    }, 800);
  }
  const actionResendOTP = () => {
    setApiCalling(true)
    const params = {
      "email": email,
      "device_type": Constant.DEVICE_TYPE,
      "device_id": ""
    }
    API.RESEND_OTP(params).then(async (response) => {
      setApiCalling(false)
      setOTPTimer(Constant.OTP_TIMER)
    }).catch(error => {
      setApiCalling(false)
      Utils.handleCatchError(error, props.navigation)
      return error;
    });
  }
  const actionVerify = async () => {
    if (Utils.isFormValidMessage(['otp'], { otp })) {
      Utils.enableAnimation(250)
      setApiCalling(true)
      const params = {
        "otp": otp,
        "user_name": username,
        "referral_code": refferal,
        "email": email,
        "password": md5.hex_md5(password + ""),
        "device_type": Constant.DEVICE_TYPE,
        "token": Constant.DEVICE_ID,
        "device_id": "",
      }
      API.SIGNUP_VALIDATE(params).then(async (response) => {
        let result = response.data;
        Utils.enableAnimation(250)
        setApiCalling(false)
        if (result.response_code == Constant.SUCCESS_STATUS) {
          var user_profile = result.data.user_profile;
          var session_key = result.data.Sessionkey;
          EventRegister.emit('goBackSignup')
          EventRegister.emit('resetSignupState')
          await Promise.all([
            Constant.SESSION_KEY = session_key,
            AppPreferences.setItem(PreferenceConstant.IS_LOGIN, "true"),
            AppPreferences.setItem(PreferenceConstant.USER_PROFILE, JSON.stringify(user_profile)),
            AppPreferences.setItem(PreferenceConstant.SESSION_KEY, session_key),
          ]).then(() => {
            setTimeout(() => {
              Utils.navToRoot('LandingScreen', props.navigation)
            }, 50);
          });
        }
      }).catch(error => {
        Utils.enableAnimation(250)
        setApiCalling(false)
        Utils.handleCatchError(error, props.navigation)
        return error;
      });

    }
  }
  const handleCellTextChange = async (text, i) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };
  const renderTimer = () => {
    return (
      <Animated.View style={styles.viewTimer(heaadingPos, responsive)}>
        <Image style={styles.imgTimer(responsive)} source={Images.TIMER} defaultSource={Images.TIMER} />
        {
          otp_timer == 0 ?
            <TouchableOpacity onPress={() => actionResendOTP()}>
              <Text style={styles.txtTimer(responsive)}>{Utils._i18n("RESEND OTP")}</Text>
            </TouchableOpacity>
            :
            <Text style={styles.txtTimer(responsive)}>{Utils._i18n("RESEND IN")} <Text style={styles.txtActiveTimer}>00:{otp_timer}</Text></Text>
        }
      </Animated.View>
    )
  }

  const renderFooter = () => {
    return (
      <>
        
      </>

    )
  }
  const renderHeader = () => {
    return (
      <View style={styles.header_container}>
        <Animated.Text style={styles.textHeading(heaadingPos, responsive)}>{Utils._i18n("Verify Your Email")}</Animated.Text>
        <Animated.Text style={styles.textSubHeading(heaadingPos, responsive)}>{Utils._i18n("Code send")}</Animated.Text>
        <Animatable.View duration={800} style={styles.form_container(responsive)} iterationCount={1} animation={"fadeIn"} easing={'ease-out-sine'}>
          {renderTimer()}
          <Animated.View style={styles.viewField(otpAnim)}>
            <OTPTextView
              ref={input}
              containerStyle={styles.otpContainer(responsive)}
              textInputStyle={styles.otpTextInput(responsive)}
              handleTextChange={setOtpInput}
              handleCellTextChange={handleCellTextChange}
              inputCount={4}
              keyboardType="numeric"
              tintColor={[Core.primaryColor, Core.gold_tips, Core.primaryColor, Core.gold_tips]}
            />
          </Animated.View>

          <Animated.View style={styles.btnView(btnLoginAnim, Utils.isFormValid(['otp'], { otp }))}>
            <TouchableOpacity onPress={() => actionVerify()}>
              <LinearGradient
                locations={[0, 1]}
                colors={Utils.isFormValid(['otp'], { otp }) ? [Core.primaryColor, Core.gold_tips] : [Core.light_gray, Core.light_gray]}
                useAngle={true}
                angle={180}
                style={styles.btnLogin(apiCalling, responsive)}>
                {
                  !apiCalling ?
                    <Text style={styles.buttonText(responsive)}>{Utils._i18n("Verify")}</Text>
                    :
                    <ActivityIndicator color={Core.black} />
                }
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

        </Animatable.View>
      </View>
    )
  }
  return (
    <MainBackground isAnimatedScreen={isAnimatedScreen || apiCalling} isAnimated={false} loadAnimation={loadAnimation}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : 'none'} style={styles.wrapper}>
        <ListView
          keyboardShouldPersistTaps='handled'
          key={"LoginPage"}
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          style={styles.wrapper}
          dataSource={ds.cloneWithRows([])}
          renderHeader={renderHeader}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
      </KeyboardAvoidingView>
        <Animated.View style={styles.bottomFlex(responsive,bottomAnim)}>
            <Animated.View style={styles.bottomView(btnPrivacyAnim, responsive)}>
                <View style={styles.viewEdit(responsive)}>
                  <Text style={styles.txtOTPsent(responsive)}>{Utils._i18n("OTP is sent to")}</Text>
                  <View style={styles.viewEmailContainer(responsive)}>
                    <Text style={styles.txtEmail(responsive)}>{email}</Text>
                    <TouchableOpacity onPress={backAction}>
                      <Image style={styles.imgEdit(responsive)} source={Images.EDIT} defaultSource={Images.EDIT} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Animated.Text style={styles.textPrivacy(responsive)}>
                  {
                    Utils._i18n('terms_desc').split('##').map((itm, idx) => {
                      return (
                        <Fragment>
                          {itm}
                          {
                            idx == 0 &&
                            <Text style={styles.activePrivacy}>{Utils._i18n("terms & conditions")}</Text>
                          }
                        </Fragment>
                      )
                    })
                  }
                </Animated.Text>
              </Animated.View>
            <Image style={styles.left_pos(responsive)} source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} />
            <Image style={styles.right_pos(responsive)} source={Images.RIGHT_VERTICAL} defaultSource={Images.RIGHT_VERTICAL} />
        </Animated.View>

    </MainBackground>
  )

};
export default VerifyEmail;
