async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
    }
}
const getFcmToken = async () => {
    //get old token here
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken, 'the new genrated token');
                //handle new token in local here
            }
        } catch (error) {
            console.log(error, 'error raised in fcmToken');

        }
    }
};

const notificationListener = async ({ navigation }) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state: ',
            remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.type);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    })
    messaging().onMessage(async remoteMessage => {
        console.log('received in foreground -> ', remoteMessage.notification);
        navigation.navigate(remoteMessage.data.type);
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                navigation.navigate(remoteMessage.data.type);
            }
        });
};
