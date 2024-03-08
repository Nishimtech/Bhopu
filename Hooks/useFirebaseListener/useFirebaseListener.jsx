import { useEffect, useState } from 'react';
import notifee, { AndroidColor, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {
    Alert
} from 'react-native';

const UseFirebaseListener = () => {
    const [token, setToken] = useState(null)
    const [listeners, setListeners] = useState(false)

    const getToken = async () => {
        const hasPermission = await messaging().hasPermission();
        if (!hasPermission) {
            await messaging().requestPermission();
        }
        await messaging().registerDeviceForRemoteMessages();
        const _token = await messaging().getToken();
        console.log('FCM KEY ======>>>>>>> ', "AAAAFa5uJ24:APA91bEKhGBJs-6tQX7s6-XxL7kS_Z-DvVg67eEUlDIv80M1nhml6eWA3TbzxJqOynL5wbxKazG4qB9pxlFhwrV8C7cHrg-wCny7VD4SEASQ_HblWm7U_Ezq67DAF_ajxQy3RfH5lFie");
        console.log('TOKEN ======>>>>>>> ', _token);
        setToken(_token)
    }

    const onMessageReceived = async (remoteMessage) => {

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'default'
        });

        // Required for iOS
        // See https://notifee.app/react-native/docs/ios/permissions
        await notifee.requestPermission();

        await notifee.displayNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: 'https://i.pinimg.com/564x/0f/5c/46/0f5c467465f320e48ae0dd3685c63687.jpg',
            android: {
                channelId,
                smallIcon: 'ic_notification',
                largeIcon: require('../../assets/logo.png'),
                sound: 'default',
                timestamp: Date.now(), // 8 minutes ago
                showTimestamp: true,

            },
        });
    };
    const createNotificationListeners = async () => {

        /*
         * CASE 1: Triggered for data only payload in foreground
         */
        // messaging().onMessage(async remoteMessage => {
        //     /* Handle the incoming data on remoteMessage*/

        //     onMessageReceived(remoteMessage)
        // });
        messaging().onMessage(onMessageReceived);


        /*
        *  CASE 2: Register background handler, handled on background state
        */
        // messaging().setBackgroundMessageHandler(async remoteMessage => {
        //     console.log('Message handled in the background!', remoteMessage);
        //     onMessageReceived(remoteMessage)
        //     // PermissionService.showLocalNotification(remoteMessage)
        // });
        messaging().setBackgroundMessageHandler(onMessageReceived);

        /*
         * CASE 3: If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
         */
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Message handled in the open!', remoteMessage);
        });


        /*
         * CASE 4: If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
         */
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {

            });


    }
    useEffect(() => {
        if (!token) getToken();
        messaging().setAutoInitEnabled(true)
        return () => {

        }
    }, [token]);
    useEffect(() => {
        const unsubscribe = async () => !listeners ? createNotificationListeners().then(r => console.log("local push notification listeners created")) : null;
        setListeners(true)
        return unsubscribe;
    }, [listeners]);
};

export { UseFirebaseListener };

