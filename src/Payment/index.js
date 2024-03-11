import { View, Text, NativeEventEmitter, Button } from 'react-native'
import React, { useEffect } from 'react'
import PayUBizSdk from 'payu-non-seam-less-react';
import { sha512 } from 'js-sha512';

export default function Payment() {
    var payUPaymentParams = {
        key: "tDoQV5",
        transactionId: "12345",
        amount: "100",
        productInfo: "product Info",
        firstName: "Customer firstName",
        email: "nishi.vinfotech@gmail.com",
        phone: "7987420839",
        ios_surl: 'https://payu.herokuapp.com/ios_success',
        ios_furl: 'https://payu.herokuapp.com/ios_failure',
        android_surl: 'https://payu.herokuapp.com/success',
        android_furl: 'https://payu.herokuapp.com/failure',

        environment: "0",//<0 for Production/1 for Staging>
        userCredential: "key:7987420839",
        
        
    }
    const payUCheckoutProConfig = {
        merchantName: "product Info",
        showExitConfirmationOnCheckoutScreen: true,
        showExitConfirmationOnPaymentScreen: true,
        surePayCount: 0,
        merchantResponseTimeout: 50000,
        autoSelectOtp: true,
        autoApprove: true,
        merchantSMSPermission: true,
        showCbToolbar: true
    }

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(PayUBizSdk);
        const paymentSuccess = eventEmitter.addListener('onPaymentSuccess', onPaymentSuccess);
        const paymentFailure = eventEmitter.addListener('onPaymentFailure', onPaymentFailure);
        const paymentCancel = eventEmitter.addListener('onPaymentCancel', onPaymentCancel);
        const error = eventEmitter.addListener('onError', onError);
        const generateHash1 = eventEmitter.addListener('generateHash', generateHash);
        return () => {
            paymentSuccess.remove()
            paymentFailure.remove()
            paymentCancel.remove()
            error.remove()
            generateHash1.remove()
        }
    }, [])
    const onPaymentSuccess = (e) => {
        console.log(e.merchantResponse);
        console.log(e.payuResponse);
    }
    const onPaymentFailure = (e) => {
        console.log(e.merchantResponse);
        console.log(e.payuResponse);
    }
    const onPaymentCancel = (e) => {
        console.log('onPaymentCancel isTxnInitiated -' + e);
    }
    const onError = (e) => {
        console.log(e);
    }
    
    const generateHash = (e) => {
        console.log(e.hashName);
        console.log(e.hashString);
        var hashName = e.hashName;
        var hashValue = sha512(e.hashString + "Kq5aLUIeB4so8JvWTuM20LZQ8g2nQHb6");
        var result = { [hashName]: hashValue };
        PayUBizSdk.hashGenerated(result);
    }

    const initatePayment = () => {
        var paymentObject = {
            payUPaymentParams: payUPaymentParams,
            // payUCheckoutProConfig is optional
            // Detail can be found in latter section
            payUCheckoutProConfig: payUCheckoutProConfig
        }
        PayUBizSdk.openCheckoutScreen(paymentObject);
    }
    return (
        <View>
            <Text>Payment</Text>
            <Button title="PayU" onPress={initatePayment}/>
        </View>
    )
}