/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import AppNavigator from './src/Navigation/AppNavigator';

export default class ScheduleApp extends Component {
  render() {
    return (
      <AppNavigator initialRoute={{ident: 'CalendarScreen'}} />
    );
  }
}


AppRegistry.registerComponent('ScheduleApp', () => ScheduleApp);
