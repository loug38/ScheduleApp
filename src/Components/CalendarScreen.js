import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, StatusBar, Modal} from 'react-native';

import Calendar from 'react-native-calendar';
import {Button} from 'native-base';

var styles = require('../StyleSheets/CalendarStyleSheet');

class CalendarScreen extends Component{
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
    this.state = {
      date: null,
      dataSource: ds,
    };
    this.itemsRef = this.getRef().child('stuff');
  }

  getRef(){
    return this.props.firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          Date: child.val().Date,
          Name: child.val().Name,
          Phone: child.val().Phone,
          Time: child.val().Time,
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

  onAddAppointment(){
    return(
      <Modal
            transparent={false}
            visible={true}
      >
        <View><Text> Hey </Text></View>
      </Modal>
    );
  }

  _renderRow(feedRow){
    return (
      <View style={styles.li}>
        <Text>
        {`Name: ${feedRow.Name}\nDate: ${feedRow.Date}\nTime: ${feedRow.Time}\nPhone: ${feedRow.Phone}`}
        </Text>
      </View> 
    );
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={{height: 20, backgroundColor: "#B71C1C"}} />
        <Calendar onDateSelect={(date) => this.onDateSelect(date)}
                  weekStart={0}
                  showControls={true}
        />
        <ListView dataSource={this.state.dataSource}
                  renderRow={(feedRow) => { return this._renderRow(feedRow)}}
                  enableEmptySections={true}
                  style={styles.listView}
        />
        {/* <Text> Selected Date: {this.state.date} </Text> */}
        <Button style={styles.addButton} onPress={() => {this.onAddAppointment()}}> Add Appointment </Button>
      </View>
    );
  }
}

module.exports = CalendarScreen;