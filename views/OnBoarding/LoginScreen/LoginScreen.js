import React, { useState, useEffect, Fragment } from 'react';
import { KeyboardAvoidingView, Platform, Text, View, Animated, TouchableOpacity, Easing, Image, ActivityIndicator, Keyboard } from 'react-native';
import { InputField, MainBackground } from '../../Components';
import ListView from "deprecated-react-native-listview";
import * as Animatable from 'react-native-animatable';
import { API, Constant, Core, Images, Utils } from '../../../Helper';
import LinearGradient from 'react-native-linear-gradient'
import { EventRegister } from 'react-native-event-listeners'
import AppPreferences from '../../../Preferences/AppPreferences';
import PreferenceConstant from '../../../Preferences/PreferenceConstant';
import { useResponsiveSizes } from "react-native-responsive-sizes";
import styles from './styles';
import md5 from "react-native-md5";

const LoginScreen = (props) => {
  const responsive = useResponsiveSizes();
  const [heaadingPos] = useState(new Animated.Value(-Constant.FULL_WIDTH))
  const [emailPos] = useState(new Animated.Value(-Constant.FULL_WIDTH))
  const [pwdPos] = useState(new Animated.Value(-Constant.FULL_WIDTH))
  const [btnLoginAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [btnConnectAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [btnPrivacyAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [bottomAnim] = useState(new Animated.Value(0))
  const [isAnimatedScreen, setAnimatedScreen] = useState(true)
  const [apiCalling, setApiCalling] = useState(false)
  const [socialCalling, setSocialCalling] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    let listener = EventRegister.addEventListener('goBackLogin', (data) => {
      loadAnimation(0, 0)
    })
    return (() => {
      EventRegister.removeEventListener(listener)
    })
  }, [])
  const loadAnimation = (value, value1, nextScreen = '') => {
    setAnimatedScreen(true)
    Animated.parallel([
      Animated.timing(heaadingPos, { toValue: value, duration: 300, easing: Easing.cubic }),
      Animated.timing(emailPos, { toValue: value, duration: 300, easing: Easing.cubic }),
      Animated.timing(pwdPos, { toValue: value, duration: 500, easing: Easing.cubic }),
      Animated.timing(btnLoginAnim, { toValue: value1, duration: 700, easing: Easing.linear }),
      Animated.timing(btnConnectAnim, { toValue: value1, duration: 900, easing: Easing.linear }),
      ...(nextScreen != 'ForgotPassword' ? [Animated.timing(btnPrivacyAnim, { toValue: value1, duration: 1100, easing: Easing.linear })] : [])
    ]).start();
    setTimeout(() => {
      setAnimatedScreen(false)
      if (nextScreen != '') {
        Keyboard.dismiss()
        props.navigation.navigate(nextScreen)
      }
    }, 700);
  }
  const onChangeText = (text, type) => {
    switch (type) {
      case "email":
        setEmail(text)
        break;
      case "password":
        setPassword(text)
        break;
      default:
        break;
    }
  };
  const actionLogin = () => {
    if (Utils.isFormValidMessage(['email', 'password'], { email, password }, true)) {
      Utils.enableAnimation(250)
      setApiCalling(true)
      const params = {
        "email": email,
        "password": md5.hex_md5(password + ""),
        "device_type": Constant.DEVICE_TYPE,
        "token": Constant.DEVICE_ID,
        "device_id": "", "source": "", "medium": "", "campaign": "", "term": "", "content": "",
      }
      API.LOGIN(params).then(async (response) => {
        let result = response.data;
        Utils.enableAnimation(250)
        setApiCalling(false)
        if (result.response_code == Constant.SUCCESS_STATUS) {
          var user_profile = result.data.user_profile;
          var session_key = result.data.Sessionkey;
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
  const renderHeader = () => {
    return (
      <View style={styles.header_container}>
        <Animated.Text style={styles.textHeading(heaadingPos, responsive)}>{Utils._i18n('Login')}</Animated.Text>
        <Animatable.View duration={800} style={styles.form_container(responsive)} iterationCount={1} animation={"fadeIn"} easing={'ease-out-sine'}>
          <Animated.View style={styles.viewField(emailPos)}>
            <InputField
              onChangeText={onChangeText}
              type={'email'}
              value={email}
              label={'Email'}
              img_name={Images.MAIL}
              label_name={'Enter Your Email'}
              textContentType={'emailAddress'}
              returnKeyType={'done'}
              keyboardType={'email-address'}
            />
          </Animated.View>
          <Animated.View style={styles.viewField(pwdPos)}>
            <InputField
              onChangeText={onChangeText}
              type={'password'}
              value={password}
              label={'Password'}
              img_name={Images.PASSWORD}
              label_name={'Enter Password'}
              textContentType={'emailAddress'}
              returnKeyType={'done'}
              keyboardType={'default'}
            />
            <TouchableOpacity style={styles.viewForgot(responsive)} onPress={() => loadAnimation(-Constant.FULL_WIDTH, Constant.FULL_HEIGHT, 'ForgotPassword')}>
              <Text style={styles.txtForgotPwd(responsive)}>{Utils._i18n("Forgot Password")}</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={styles.btnView(btnLoginAnim, Utils.isFormValid(['email', 'password'], { email, password }))}>
            <TouchableOpacity onPress={() => actionLogin()} style={styles.btnLoginTouch(apiCalling, responsive)}>
              <LinearGradient
                locations={[0, 1]}
                colors={Utils.isFormValid(['email', 'password'], { email, password }) ? [Core.primaryColor, Core.gold_tips] : [Core.light_gray, Core.light_gray]}
                useAngle={true}
                angle={180}
                style={styles.btnLogin}>
                {
                  !apiCalling ?
                    <Text style={styles.buttonText(responsive)}>{Utils._i18n("Login")}</Text>
                    :
                    <ActivityIndicator color={Core.black} />
                }
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.txtCreateAccount(responsive)}>{Utils._i18n("Don’t have an account yet")}<Text onPress={() => loadAnimation(-Constant.FULL_WIDTH, Constant.FULL_HEIGHT, 'SignupScreen')} style={styles.activeCreateAccount}> {Utils._i18n("Create an Account")}</Text></Text>
          <Animated.View style={styles.lineHorizontal(btnConnectAnim, responsive)} />
          <Text style={styles.txtConnect(responsive)}>{Utils._i18n("Connect instantly with")}</Text>
          <Image style={styles.btnSocial(responsive)} source={Images.IC_SOCIAL} defaultSource={Images.IC_SOCIAL} />

        </Animatable.View>


      </View>
    )
  }

  return (
    <MainBackground isAnimatedScreen={isAnimatedScreen || apiCalling} isAnimated={true} loadAnimation={loadAnimation}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : 'undefined'} style={styles.wrapper}>
        <ListView
          key={"LoginPage"}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          style={styles.wrapper}
          scrollEnabled={true}
          dataSource={ds.cloneWithRows([])}
          renderHeader={renderHeader}
          removeClippedSubviews={!(Platform.OS == "ios")}
        />
      </KeyboardAvoidingView>
      <Animatable.View pointerEvents='none' duration={1800} iterationCount={1} animation={"fadeInUpBig"} easing={'ease-out-sine'} style={styles.bottomView(responsive)}>
        <Animated.View style={styles.bottomFlex(responsive,bottomAnim)}>
            <Image style={styles.left_pos(responsive)} source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} />
            <Animated.Text style={styles.textPrivacy(btnPrivacyAnim, responsive)}>
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
            <Image style={styles.right_pos(responsive)} source={Images.RIGHT_VERTICAL} defaultSource={Images.RIGHT_VERTICAL} />
        </Animated.View>
      </Animatable.View>
    </MainBackground>
  )

};
export default LoginScreen;
