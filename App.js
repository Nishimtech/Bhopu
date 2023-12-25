import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from './src/navigations/StackNavigator'
const Stack = createNativeStackNavigator();
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}


export default App;
