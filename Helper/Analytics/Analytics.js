import analytics from '@react-native-firebase/analytics';
class Analytics {
  static setCurrentScreen = async (screenName) => {
    try {
      let obj = { screen_class: screenName, screen_name: screenName }
      analytics().logScreenView(obj);
    } catch (error) {
      console.error(error)
    }
  }
  static logEvent = async (eventName, propertyObject = {}) => {
    try {
      analytics().logEvent(eventName, propertyObject);
    } catch (error) {
      console.error(error)
    }
  }
  static setAnalyticsCollectionEnabled = async () => {
    try {
      analytics().setAnalyticsCollectionEnabled(true);
    } catch (error) {
      console.error(error)
    }
  }
  static logLogin = async (user_unique_id, user_name) => {
    try {
      analytics().setUserId(user_unique_id);
      analytics().setUserProperty("user_name", user_name)
      analytics().logEvent('login');
    }
    catch (error) {
      console.error(error)
    }
  }
  static logSignup = async (user_unique_id, user_name, referral_code) => {
    try {
      analytics().setUserId(user_unique_id);
      analytics().setUserProperty("user_name", user_name)
      analytics().logEvent('sign_up', { "referral_code": referral_code });
    }
    catch (error) {
      console.error(error)
    }
  }
}
export default Analytics
