import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Calendar from 'react-native-calendar';
import FCM from 'react-native-fcm';

var styles = require('../StyleSheets/CalendarStyleSheet');

class CalendarScreen extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	date: null,
	  };
	}

	onDateSelect(date){
		//fetch from db
		this.setState({date: date});
	}

	render(){
		var date;
		return(
			<View style={styles.container}>
				<Calendar onDateSelect={(date) => this.onDateSelect(date)}
						  weekStart={0}	
						  showControls={true} 
				/>
				<Text> Selected Date: {this.state.date} </Text>
			</View>
		);
	}
}

module.exports = CalendarScreen;