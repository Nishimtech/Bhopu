import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from "react-native"


import HomeScreen from '../screens/HomeScreen/index'
import IndoreNews from '../screens/IndoreNews/index'
import Discover from '../screens/Discover/index'
import More from '../screens/More/index'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={{
      // tabBarInactiveTintColor: black,
      // tabBarActiveTintColor: green,
    }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false, 
          tabBarIcon: props => <Image source ={require('../assets/home.png')} {...props} style={{height:25, width:22}}/>,
        }}
          
       
      />
      <Tab.Screen
        name="IndoreNews"
        component={IndoreNews}
        options={{
          headerShown: false,
          tabBarIcon: props => <Image source ={require('../assets/newsIcon.png')} {...props} style={{height:25, width:22}}/>,
     
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          headerShown: false,
          tabBarIcon: props => <Image source ={require('../assets/search.png')} {...props} style={{height:25, width:22}}/>,
           
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
          tabBarIcon: props => <Image source ={require('../assets/more.png')} {...props} style={{height:20, width:20}}/>,
          
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;