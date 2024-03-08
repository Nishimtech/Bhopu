import React, { useState, useEffect, Fragment } from 'react';
import { KeyboardAvoidingView, BackHandler, Platform, Text, View, Animated, TouchableOpacity, Easing, Image, ActivityIndicator, Keyboard } from 'react-native';
import { InputField, MainBackground, ForgotAlert } from '../../Components';
import styles from './styles';
import ListView from "deprecated-react-native-listview";
import * as Animatable from 'react-native-animatable';
import { API, Constant, Core, Images, Utils } from '../../../Helper';
import LinearGradient from 'react-native-linear-gradient'
import { EventRegister } from 'react-native-event-listeners'
import { useResponsiveSizes } from "react-native-responsive-sizes";

const ForgotPassword = (props) => {
  const responsive = useResponsiveSizes();
  const [heaadingPos] = useState(new Animated.Value(responsive.size(750)))
  const [emailPos] = useState(new Animated.Value(Constant.FULL_WIDTH))
  const [backPos] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [btnLoginAnim] = useState(new Animated.Value(Constant.FULL_HEIGHT))
  const [isAnimatedScreen, setAnimatedScreen] = useState(true)
  const [openAlert, setOpenAlert] = useState(false)
  const [apiCalling, setApiCalling] = useState(false)
  const [bottomAnim] = useState(new Animated.Value(0))
  const [email, setEmail] = useState('')

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
    let listener = EventRegister.addEventListener('goBackForgot', (data) => {
      loadAnimation(0, 0)
    })
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      if (openAlert) {
        return false;
      } else {
        backAction()
        return true;
      }
    });
    return (() => {
      EventRegister.removeEventListener(listener);
      backHandler.remove()
    })
  }, [])
  const onChangeText = (text, type) => {
    switch (type) {
      case "email":
        setEmail(text)
        break;
      default:
        break;
    }
  };
  const loadAnimation = (value, value1, value2 = 0) => {
    setAnimatedScreen(true)
    Animated.parallel([
      Animated.timing(heaadingPos, { toValue: value2, duration: 300, easing: Easing.linear }),
      Animated.timing(emailPos, { toValue: value1, duration: 500, easing: Easing.linear }),
      Animated.timing(btnLoginAnim, { toValue: value, duration: 700, easing: Easing.linear }),
      Animated.timing(backPos, { toValue: value, duration: 700, easing: Easing.linear }),
    ]).start();
    setTimeout(() => {
      setAnimatedScreen(false)
    }, 800);
  }
  const backAction = async () => {
    setOpenAlert(false);
    await loadAnimation(Constant.FULL_HEIGHT, Constant.FULL_WIDTH, responsive.size(750))
    setTimeout(() => {
      EventRegister.emit('goBackLogin')
      props.navigation.goBack()
    }, 800);
  }
  const moveAction = async () => {
    if (Utils.isFormValidMessage(['email'], { email })) {
      Utils.enableAnimation(250)
      setApiCalling(true)
      const params = {
        "email": email,
      }
      API.FORGOT_PASSWORD(params).then(async (response) => {
        let result = response.data;
        Utils.enableAnimation(250)
        setApiCalling(false)
        if (result.response_code == Constant.SUCCESS_STATUS) {
          setOpenAlert(true)
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
        <Animated.Text style={styles.textHeading(heaadingPos, responsive)}>{Utils._i18n("Forgot Password")}</Animated.Text>
        <Animated.Text style={styles.textSubHeading(heaadingPos, responsive)}>{Utils._i18n("Instructions")}</Animated.Text>
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
              returnKeyType={'next'}
              keyboardType={'email-address'}
            />
          </Animated.View>

          <Animated.View style={styles.btnView(btnLoginAnim, Utils.isFormValid(['email'], { email }))}>
            <TouchableOpacity style={styles.btnLoginTouch(apiCalling, responsive)} onPress={() => moveAction()}>
              <LinearGradient
                locations={[0, 1]}
                colors={Utils.isFormValid(['email'], { email }) ? [Core.primaryColor, Core.gold_tips] : [Core.light_gray, Core.light_gray]}
                useAngle={true}
                angle={180}
                style={styles.btnLogin}>
                {
                  !apiCalling ?
                    <Text style={styles.buttonText(responsive)}>{Utils._i18n("Submit")}</Text>
                    :
                    <ActivityIndicator color={'black'} />
                }
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

        </Animatable.View>
      </View>
    )
  }

  return (
    <MainBackground isAnimatedScreen={isAnimatedScreen || apiCalling} backPos={backPos} isAnimated={false} isBack={true} backAction={backAction} loadAnimation={loadAnimation}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : 'none'} style={styles.wrapper}>
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
      <View style={styles.bottomView(responsive)}>
         <Animated.View style={styles.bottomFlex(responsive,bottomAnim)}>
              <Image style={styles.left_pos(responsive)} source={Images.LEFT_VERTICAL} defaultSource={Images.LEFT_VERTICAL} />
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
              <Image style={styles.right_pos(responsive)} source={Images.RIGHT_VERTICAL} defaultSource={Images.RIGHT_VERTICAL} />
          </Animated.View>
        </View>

        <ForgotAlert openAlert={openAlert} dismissOnTouchOutside={false} onDismiss={backAction} />

    </MainBackground>
  )

};
export default ForgotPassword;
