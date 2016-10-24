import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';

import Calendar from 'react-native-calendar';

var styles = require('../StyleSheets/CalendarStyleSheet');

class CalendarScreen extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	date: null,
	  	dataSource: new ListView.DataSource({
	  		rowHasChanged: (row1, row2) => row1 !== row2,
	  	})
	  };
	  this.itemsRef = this.props.firebaseApp.firebaseApp.database().ref();
	}

	componentDidMount() {
		this.listenForItems(this.itemsRef);
	}

	onDateSelect(date){
		//fetch from db
		this.setState({date: date});
	}

	listenForItems(itemsRef){
		itemsRef.on('value', (snap) => {
			var items = [];
			snap.forEach((child) => {
				items.push({
					title: child.val().title,
					_key: child.key
				});
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items)
			});
		});
	}

  _renderRow(rowInfo){
    return(
      <View> <Text> ROW </Text> </View>
    );
  }

	render(){
		var date;
		return(
			<View style={styles.container}>
				<Calendar onDateSelect={(date) => this.onDateSelect(date)}
						  weekStart={0}	
						  showControls={true} 
				/>
				<ListView dataSource={this.state.dataSource}
						      renderRow={(rowInfo) => this._renderRow(rowInfo))}/>
				<Text> Selected Date: {this.state.date} </Text>
			</View>
		);
	}
}

module.exports = CalendarScreen;