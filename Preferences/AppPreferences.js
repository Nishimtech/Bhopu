import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AppPreferences extends Component {

  static setItem(key, value) {
    try {

        AsyncStorage.setItem(key, value);

    } catch (error) {
      console.log(error.message);
    }
  }

  static getItem(key) {
    try {

      return AsyncStorage.getItem(key);

    } catch (error) {
      console.log(error.message);
    }
  }

  static clearAllData() {
    try {

        AsyncStorage.clear();

    } catch (error) {
      console.log(error.message);
    }
  }

  static removeItem(key) {
    try {
        AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error.message);
    }
  }

}
