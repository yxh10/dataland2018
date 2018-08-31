import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import SnapScreen from './Screens/SnapScreen';
import SnapResultScreen from './Screens/SnapResultScreen';

const RootStack = createStackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    },
  },
  Snap: { screen: SnapScreen },
  SnapResult: { screen: SnapResultScreen}
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
