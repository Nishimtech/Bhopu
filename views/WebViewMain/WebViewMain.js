import React, {useState} from "react";
import {SafeAreaView, StatusBar, StyleSheet} from "react-native";

const WebViewMain = () => {
    const [webviewLoading, setWebviewLoading] =useState(true)
    return (
        <SafeAreaView style={styles.topSafeArea}>
        <StatusBar barStyle={webviewLoading ? 'dark-content' : 'light-content'}
        backgroundColor="grey"/>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

})

export default WebViewMain