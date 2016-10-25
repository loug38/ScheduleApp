import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';

import Calendar from 'react-native-calendar';

var styles = require('../StyleSheets/CalendarStyleSheet');

class CalendarScreen extends Component{
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
    this.state = {
      date: null,
      dataSource: ds,
    };
    this.itemsRef = this.props.firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
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

  onDateSelect(date){
    this.setState({date: date})
  }

  _renderRow(feedRow){
    return <View><Text>{feedRow.first}</Text></View>
  }

  render(){
    return(
      <View>
        <Calendar onDateSelect={(date) => this.onDateSelect(date)}
                  weekStart={0}
                  showControls={true}
        />
        <ListView dataSource={this.state.dataSource}
                  renderRow={(feedRow) => { return this._renderRow(feedRow)}}
        />
        <Text> Selected Date: {this.state.date} </Text>
      </View>
    );
  }
}

module.exports = CalendarScreen;