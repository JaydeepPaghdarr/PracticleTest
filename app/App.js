import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  ScrollView,
  Dimensions,
  StatusBar,
  Navigator,
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';


import {
  createAppContainer
} from 'react-navigation';

import {createStackNavigator} from "react-navigation-stack"

import HomeScreen from "./containers/HomeScreen"
import DetailScreen from "./containers/DetailScreen"

console.disableYellowBox = true;


const RootStack = createStackNavigator(
  {
    HomeScreen: { 
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      } 
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: {
        header: null,
      }
    },  
  },
  {
    initialRouteName: "HomeScreen",
    navigationOptions: {
      header: null
    }
  }
);

const App = createAppContainer(RootStack);

export default App;