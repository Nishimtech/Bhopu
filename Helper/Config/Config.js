import {
    PRIMARY_COLOR, WEB_URL,
    FB_APP_ID,
    GOOGLE_ANDROID,
    GOOGLE_IOS,
    GOOGLE_WEB,
    IS_DARK,
    APP_NAME,
    APP_VERSION,
    S3URL,
    IS_STORE_SUBMISSION,
    SCHEME,
  } from '@env'
  
  export default {
    appName: APP_NAME,
    primary_color: PRIMARY_COLOR,
    red: 'red',
    green: 'green',
    statusbar: {
        bg: PRIMARY_COLOR,
        color: 'light-content'
    },
    scheme:SCHEME,
    apiGateway: WEB_URL,
    s3URL: S3URL,
    FB_APP_ID: FB_APP_ID,
    GOOGLE_ANDROID: GOOGLE_ANDROID,
    GOOGLE_IOS: GOOGLE_IOS,
    GOOGLE_WEB: GOOGLE_WEB,
    app_version: APP_VERSION,
    is_store_submission: IS_STORE_SUBMISSION
  };
  