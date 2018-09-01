import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import SnapScreen from './Screens/SnapScreen';
import SnapResultScreen from './Screens/SnapResultScreen';
import AlertListScreen from './Screens/AlertListScreen';
import AlertDetailScreen from './Screens/AlertDetailScreen';

const RootStack = createStackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    },
  },
  Snap: { 
    screen: SnapScreen,
    navigationOptions: {
      title: 'Snap',
      header: null //this will hide the header
    },
  },
  SnapResult: { 
    screen: SnapResultScreen,
    navigationOptions: {
      title: 'Snap',
      header: null //this will hide the header
    },
  },
  AlertList: { 
    screen: AlertListScreen,
    navigationOptions: {
      title: 'Alerts',
      header: null //this will hide the header
    },
  },
  AlertDetail: { 
    screen: AlertDetailScreen,
    navigationOptions: {
      title: 'Alert Detail',
      header: null //this will hide the header
    },
  }
});

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
