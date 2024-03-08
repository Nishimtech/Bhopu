
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useResponsiveSizes } from "react-native-responsive-sizes";
import WebView from "react-native-webview";
import AppPreferences from "../../../Preferences/AppPreferences";
import PreferenceConstant from "../../../Preferences/PreferenceConstant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Constant, Utils } from "../../../Helper";

const MoreScreen = ({userProfile,isVisible,hideFunc,logoutRecieved}) => {
  const responsive = useResponsiveSizes();
  const [pageURL, setPageURL] = useState('https://props.vinfotech.org/more')
  const myWebView = useRef(null);
  const [appLoaded, webLoaded] = useState(false)

  useEffect(() => {
    if(appLoaded){
      let objProfile = userProfile
      objProfile.session_key = Constant.SESSION_KEY
      objProfile.version = '1.0.0'
      var dictJSON = { action: "login", type: "", response: objProfile };
      sendEventToWeb(dictJSON)
      setPageURL('https://props.vinfotech.org/more')
    }
  }, [appLoaded])
  const sendEventToWeb = (payload) => {
    if (myWebView.current) {
        setTimeout(() => {
            myWebView.current.injectJavaScript(
                `window.postMessage(${JSON.stringify(payload)} , '*');`
            );
            
        }, 250)
    }
}
const onMessage = async ({ nativeEvent }) => {
  const { data } = nativeEvent
  let msgData;
  try {
      msgData = JSON.parse(data);
  } catch (err) {
      return;
  }
  const { targetFunc } = msgData
  switch (targetFunc) {
      case "backMore":
        hideFunc()
        break;
      case "web_loaded":
        webLoaded(true)
        break;
      case "handleLogoutReceived":
        webLoaded(false)
        hideFunc()
        logoutRecieved()
          break;
      default:
         break

  }
}
  return (
    <View pointerEvents={isVisible?'auto':'none'} style={{position:'absolute',top:0,width:'100%',height:'100%',opacity:isVisible?1:0}}>
          <WebView
              ref={ref => (myWebView.current = ref)}
              originWhitelist={['*']}
              source={{ uri: pageURL}}
              onMessage={onMessage}
              userAgent={"android-app "}
              overScrollMode={'never'}
              scalesPageToFit={true}
              bounces={false}
              javaScriptEnabled={true}
              decelerationRate={1}
              startInLoadingState={true}
              mediaPlaybackRequiresUserAction={true}
              containerStyle={{flex:1}}
              domStorageEnabled={true}
              renderLoading={() => {
                  return null;
              }}
              onLoadProgress={(event) => {
                  // onNavigationStateChange(event.nativeEvent)
              }}
              onLoadEnd={() => {

              }}
              onError={() => {

              }}
          />
    </View>
  )

};
export default MoreScreen;
