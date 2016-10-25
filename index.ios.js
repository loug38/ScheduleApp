/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import * as firebase from 'firebase';

import AppNavigator from './src/Navigation/AppNavigator';

const firebaseConfig = {
  apiKey: 'AIzaSyDVyjbRfIT6trV05Z0cRmWdGUIQl0NPBbQ',
  authDomain: 'scheduleapp-8ac00.firebaseapp.com',
  databaseURL: 'https://scheduleapp-8ac00.firebaseio.com/',
  storageBucket: '',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class ScheduleApp extends Component {
  render() {
    return (
      <AppNavigator initialRoute={{ident: 'CalendarScreen', firebaseApp: {firebaseApp}}} />
    );
  }
}


AppRegistry.registerComponent('ScheduleApp', () => ScheduleApp);
