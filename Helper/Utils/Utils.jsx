import { I18n } from '../../i18n'
import { Auth, Validation, Toast, Constant } from '..'
import { LayoutAnimation, Platform, UIManager, View } from 'react-native';
import Moment from 'moment';
import { StackActions } from "@react-navigation/native";
import AppPreferences from '../../Preferences/AppPreferences';


const Utils = {
  getWinCalculation: (prize_data) => {
    let prizeAmount = { 'real': 0, 'bonus': 0, 'point': 0, 'is_tie_breaker': 0 };
    prize_data && prize_data.map(function (lObj, lKey) {
      var amount = 0;
      if (lObj.max_value) {
        amount = parseFloat(lObj.max_value);
      } else {
        amount = parseFloat(lObj.amount);
      }
      if (lObj.prize_type == 3) {
        prizeAmount['is_tie_breaker'] = 1;
      }
      if (lObj.prize_type == 0) {
        prizeAmount['bonus'] = parseFloat(prizeAmount['bonus']) + amount;
      } else if (lObj.prize_type == 2) {
        prizeAmount['point'] = parseFloat(prizeAmount['point']) + amount;
      } else {
        prizeAmount['real'] = parseFloat(prizeAmount['real']) + amount;
      }
    })
    return prizeAmount;
  },
  getWinTeamCalculation: (teams) => {
    let prizeAmount = { 'real': 0, 'bonus': 0, 'point': 0};
    teams && teams.map(function (item) {
        item.prize_data && item.prize_data.map(function (lObj, lKey) {
          var amount = 0;
          amount = parseFloat(lObj.amount);
          if (lObj.prize_type == 0) {
            prizeAmount['bonus'] = parseFloat(prizeAmount['bonus']) + amount;
          } else if (lObj.prize_type == 2) {
            prizeAmount['point'] = parseFloat(prizeAmount['point']) + amount;
          } else {
            prizeAmount['real'] = parseFloat(prizeAmount['real']) + amount;
          }
        })
    })
    return prizeAmount;
  },
  returnMiliSecond: (date) => {
    var timeInMilliseconds = Moment(date).valueOf()
    return timeInMilliseconds
  },
  getFormatedDateUTC: (date, outputDateFormat = "DD MMM YYYY") => {
    var stillUtc = Moment.utc(date).toDate();
    var local = Moment(stillUtc).local().format(outputDateFormat);
    return local;
  },
  getCompareDateUTC: (date, outputDateFormat = "DD MMM YYYY") => {
    var stillUtc = Moment.utc(date).toDate();
    var local = Moment(stillUtc).local().format(outputDateFormat);
    var diffDays = parseInt(Moment(stillUtc).local().format('DD')) - new Date().getDate();
    return diffDays < 7 ? local : Moment(stillUtc).local().format('DD MMM, HH:mm A');
  },
  getLiveStatus:(scheduled_date)=>{
    var stillUtc = Moment.utc(scheduled_date).toDate();
    var local = Moment(stillUtc).local().format('YYYY-MM-DD HH:MM:SS');
    var local_new = Moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
    return local_new < local
  },
  navToRoot: (routeName, navigation) => {
    navigation.dispatch(StackActions.replace(routeName));
  },

  _languageChange: (type) => {
    I18n.locale = type;
    Auth.setLanguage(type)
  },
  _i18n: (str) => {
    return I18n.t(str)
  },
  enableAnimation: async (duration = 100, type = 0) => {
    setImmediate(() => {
      if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(false);
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          duration,
          LayoutAnimation.Types.easeInEaseOut,
          (type == 0 ? LayoutAnimation.Properties.scaleXY : type == 2 ? LayoutAnimation.Properties.opacity : LayoutAnimation.Properties.scaleY)
        ),
      );
    });
  },
  isFormValid: (forms, state) => {
    let arr = []
    forms.map((item) => {
      let itemValidate = Validation.init(item, state[item]) === false;
      if (itemValidate) {
        arr.push(itemValidate);
      }
    })
    return arr.length === forms.length;
  },
  isFormValidMessage: (forms, state, isLogin = false) => {
    let arr = []
    for (let item of forms) {
      let itemValidate = Validation.init(item, state[item]) === false;
      if (itemValidate) {
        arr.push(itemValidate);
      } else {
        switch (item) {
          case "email":
            Toast.WarningShowToast(Utils._i18n("Please enter vaild mail address"));
            break;
          case "username":
            Toast.WarningShowToast(Utils._i18n("Please enter vaild user name"));
            break;
          case 'otp':
            Toast.WarningShowToast(Utils._i18n("Please enter vaild otp"));
            break;
          case "password":
            if (isLogin && state[item].length > 0) {
              Toast.WarningShowToast(Utils._i18n("The password is incorrect"));
            } else {
              Toast.WarningShowToast(Utils._i18n("The ## must contain minimum 8 characters, 1 symbol and 1 number").replace('##', Utils._i18n('Password')));
            }
            break;
          case "new_password":
            Toast.WarningShowToast(Utils._i18n("The ## must contain minimum 8 characters, 1 symbol and 1 number").replace('##', Utils._i18n('New Password')));
            break;
          case "confirm_password":
            Toast.WarningShowToast(Utils._i18n("The passwords do no match"));
            break;

          default:
            break;
        }
        return false;
      }
    }
    return arr.length === forms.length;
  },
  handleCatchError: (error, navigation) => {
    if (error.response && error.response.data) {
      if (error.response.data.error && error.response.data.error.user_name) {
        Utils.showErrorMessage(error.response.data.error.user_name, navigation)
      } else {
        if (error.response.data.global_error != '') {
          Utils.showErrorMessage(error.response.data.global_error, navigation)
        } else if (error.response.data.message != '') {
          Utils.showErrorMessage(error.response.data.message, navigation)
        }
      }
    }
  },
  showErrorMessage: (message, navigation) => {
    if (message == "Session key has expired" || message == "The session key is required.") {
      Utils.clearData(navigation, message)
    } else {
      Toast.FailureShowToast(message);
    }
  },
  clearData: async (navigation, message = '') => {
    if (message != '') {
      Toast.FailureShowToast(message);
    }
    await Promise.all([
      Constant.SESSION_KEY = '',
      AppPreferences.clearAllData(),
    ]).then(() => {
      setTimeout(() => {
        Utils.navToRoot('LoginScreen', navigation)
      }, 50);
    });
  },
  addSuffix: (i) => {
    var a = i % 10,
      b = i % 100;

    if (a == 1 && b != 11) {
      return (i + "st");
    } else if (a == 2 && b != 12) {
      return (i + "nd");
    } else if (a == 3 && b != 13) {
      return (i + "rd");
    } else {
      return (i + "th");
    }
  }
}

