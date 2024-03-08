import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Text, View, Animated, TouchableOpacity, Easing, Image, TouchableWithoutFeedback, ActivityIndicator, Dimensions, Keyboard, BackHandler } from 'react-native';
import { InputField, MainBackground } from '../../Components';
import ListView from "deprecated-react-native-listview";
import * as Animatable from 'react-native-animatable';
import { API, Constant, Core, Images, Toast, Utils } from '../../../Helper';
import LinearGradient from 'react-native-linear-gradient'
import { EventRegister } from 'react-native-event-listeners'
import { useResponsiveSizes } from "react-native-responsive-sizes";
import styles from './styles';
import md5 from "react-native-md5";


const SignupScreen = (props) => {
  const responsive = useResponsiveSizes();
  const [heaadingPos] = useState(new Animated.Value(responsive.size(750)))
  const [usernamePos] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [emailPos] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [pwdPos] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [re_pwdPos] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [refferalAnim] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [btnLoginAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [bottomAnim] = useState(new Animated.Value(0))
  const [btnPrivacyAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [isAnimatedScreen, setAnimatedScreen] = useState(true)
  const [apiCalling, setApiCalling] = useState(false)
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [refferal, setRefferal] = useState('')

  const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
  const resetState=()=>{
    setUserName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRefferal('')
  }
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
    let listener = EventRegister.addEventListener('goBackSignup', (data) => {
      loadAnimation(0, 0)
    })
    let listener1 = EventRegister.addEventListener('resetSignupState', (data) => {
      resetState()
    })
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return (() => {
      EventRegister.removeEventListener(listener);
      EventRegister.removeEventListener(listener1);
      backHandler.remove()
    })
  }, [])


  const loadAnimation = (value, value1, value2 = 0, nextScreen = '') => {
    setAnimatedScreen(true)
    Animated.parallel([
      Animated.timing(heaadingPos, { toValue: value2, duration: 450, easing: Easing.linear }),
      Animated.timing(usernamePos, { toValue: value, duration: 500, easing: Easing.linear }),
      Animated.timing(emailPos, { toValue: value, duration: 550, easing: Easing.linear }),
      Animated.timing(pwdPos, { toValue: value, duration: 600, easing: Easing.linear }),
      Animated.timing(re_pwdPos, { toValue: value, duration: 650, easing: Easing.linear }),
      Animated.timing(refferalAnim, { toValue: value, duration: 700, easing: Easing.linear }),
      Animated.timing(btnLoginAnim, { toValue: value1, duration: 750, easing: Easing.linear }),
      Animated.timing(btnPrivacyAnim, { toValue: value1, duration: 800, easing: Easing.linear })
    ]).start();
    setTimeout(() => {
      setAnimatedScreen(false)
      if (nextScreen != '') {
        Keyboard.dismiss()
        props.navigation.navigate(nextScreen, { username, email, password, refferal })
      }
    }, 700);
  }
  const backAction = async () => {
    await loadAnimation(Constant.FULL_WIDTH, Constant.FULL_HEIGHT, responsive.size(750))
    setTimeout(() => {
      EventRegister.emit('goBackLogin')
      props.navigation.goBack()
    }, 700);
  }
  const onChangeText = (text, type) => {
    switch (type) {
      case 'username':
        if (text.length <= 10) {
          setUserName(text)
        }
        break;
      case "email":
        setEmail(text)
        break;
      case "password":
        setPassword(text)
        break;
      case "confirm_password":
        setConfirmPassword(text)
        break;
      case "refferal":
        setRefferal(text)
        break;
      default:
        break;
    }
  };
  const actionSignup = () => {
    if (Utils.isFormValidMessage(['username', 'email', 'password', 'confirm_password'], { username, email, password, confirm_password })) {
      if (password == confirm_password) {
        Utils.enableAnimation(250)
        setApiCalling(true)
        const params = {
          "user_name": username,
          "email": email,
          "password": md5.hex_md5(password + ""),
          "device_type": Constant.DEVICE_TYPE,
          "token": Constant.DEVICE_ID,
          "referral_code": refferal,
          "device_id": "", "source": "", "medium": "", "campaign": "", "term": "", "content": "",
        }
        API.SIGNUP(params).then(async (response) => {
          let result = response.data;
          Utils.enableAnimation(250)
          setApiCalling(false)
          loadAnimation(-Constant.FULL_WIDTH, Constant.FULL_HEIGHT, -responsive.size(750), 'VerifyEmail')
        }).catch(error => {
          Utils.enableAnimation(250)
          setApiCalling(false)
          Utils.handleCatchError(error, props.navigation)
          return error;
        });
      } else {
        Toast.WarningShowToast(Utils._i18n("The passwords do no match"))
      }
    }

  }


  const renderHeader = () => {
    return (
      <View style={styles.header_container}>
        <Animated.Text style={styles.textHeading(heaadingPos, responsive)}>{Utils._i18n("Create Your Account")}</Animated.Text>
        <Animatable.View duration={800} style={styles.form_container(responsive)} iterationCount={1} animation={"fadeIn"} easing={'ease-out-sine'}>
          <Animated.View style={styles.viewField(usernamePos)}>
            <InputField
              onChangeText={onChangeText}
              type={'username'}
              value={username}
              label={'User Name'}
              vailidationMsg={Utils._i18n('Min 4 characters')}
              maxLength={10}
              img_name={Images.MAIL}
              label_name={'Enter username'}
            />
          </Animated.View>
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
              label={'Enter a Password'}
              vailidationMsg={Utils._i18n('Must contain min 8 characters, 1 symbol and 1 number')}
              img_name={Images.PASSWORD}
              returnKeyType={'done'}
              label_name={'Enter a Password'}
              keyboardType={'default'}
            />
          </Animated.View>
          <Animated.View style={styles.viewField(re_pwdPos)}>
            <InputField
              onChangeText={onChangeText}
              type={'confirm_password'}
              value={confirm_password}
              label={'Retype Password'}
              img_name={Images.PASSWORD}
              returnKeyType={'done'}
              label_name={'Enter a Password'}
              keyboardType={'default'}
            />
          </Animated.View>
          <Animated.Text style={styles.textHaveReffral(refferalAnim, responsive)}>{Utils._i18n("Have a Referral Code")}</Animated.Text>
          <Animated.View style={styles.viewField(refferalAnim)}>
            <InputField
              onChangeText={onChangeText}
              type={'refferal'}
              value={refferal}
              label={'Enter Referral Code'}
              img_name={Images.REFERRAL}
              returnKeyType={'done'}
              label_name={'Enter the Referral Code'}
            />
          </Animated.View>
          <Animated.View style={styles.btnView(btnLoginAnim, responsive, Utils.isFormValid(['username', 'email', 'password', 'confirm_password'], { username, email, password, confirm_password }))}>
            <TouchableOpacity onPress={() => actionSignup()} style={styles.btnLoginTouch(apiCalling, responsive)}>
              <LinearGradient
                locations={[0, 1]}
                colors={Utils.isFormValid(['username', 'email', 'password', 'confirm_password'], { username, email, password, confirm_password }) ? [Core.primaryColor, Core.gold_tips] : [Core.light_gray, Core.light_gray]}
                useAngle={true}
                angle={180}
                style={styles.btnLogin}>
                {
                  !apiCalling ?
                    <Text style={styles.buttonText(responsive)}>{Utils._i18n("Next")}</Text>
                    :
                    <ActivityIndicator color={Core.black} />
                }
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <Animated.Text style={styles.textPrivacy(btnPrivacyAnim, responsive)}>{Utils._i18n("Already have an account")} <Text onPress={() => backAction()} style={styles.activePrivacy}>{Utils._i18n("Login")}</Text></Animated.Text>
        </Animatable.View>
      </View>
    )
  }
 

  return (
     <MainBackground isAnimated={false} isAnimatedScreen={isAnimatedScreen} loadAnimation={loadAnimation}>
          <KeyboardAvoidingView keyboardVerticalOffset={responsive.size(130)} behavior={Platform.OS == 'ios' ? "padding" : 'null'} style={[styles.wrapper]}>
            <ListView
              key={"LoginPage"}
              keyboardShouldPersistTaps='handled'
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              style={styles.wrapper}
              dataSource={ds.cloneWithRows([])}
              renderHeader={renderHeader}
              removeClippedSubviews={!(Platform.OS == "ios")}
            />
          </KeyboardAvoidingView>
         
            <View pointerEvents='none' style={styles.bottomView(responsive)}>
                <Animated.View style={styles.bottomFlex(responsive,bottomAnim)}>
                    <Image style={styles.left_pos(responsive)} source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} />
                    <Image style={styles.right_pos(responsive)} source={Images.RIGHT_VERTICAL} defaultSource={Images.RIGHT_VERTICAL} />
                </Animated.View>
            </View>
        


        </MainBackground>


     
   

  )

};
export default SignupScreen;
