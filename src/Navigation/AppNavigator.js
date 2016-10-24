import React, {Component} from 'react';
import {Navigator} from 'react-native';

import CalendarScreen from '../Components/CalendarScreen';

class AppNavigator extends Component{
	render(){
		return(
			<Navigator initialRoute={{ident: this.props.initialRoute}}
						ref="AppNavigator"
						renderScene={this._renderScene}
						configureScene={(route) => ({
							...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
						})}
			/>
		);
	}

	_renderScene(route, navigator){
		var globalNavigatorProps = {navigator}
		switch(route.ident.ident){
			case "CalendarScreen": {
				return (
					<CalendarScreen {...globalNavigatorProps}
					  firebaseApp={route.ident.firebaseApp.firebaseApp} />
				);
				break;
			}
			default: {
				return (
					<CalendarScreen {...globalNavigatorProps} />
				);
				break;
			}
		}
	}
}

module.exports = AppNavigator;