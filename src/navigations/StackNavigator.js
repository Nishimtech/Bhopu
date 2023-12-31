import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommentScreen from '../screens/CommentScreen';

import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={TabNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigator;