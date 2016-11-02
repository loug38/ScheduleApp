import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, StatusBar, 
        Modal, TextInput, Platform} from 'react-native';

import Calendar from 'react-native-calendar';
import {Button, Spinner} from 'native-base';
import AddAppointmentModal from './AddAppointmentModal';

var styles = require('../StyleSheets/CalendarStyleSheet');
var fetched = false;
var statusBarHeight = null;

class CalendarScreen extends Component{
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
    this.state = {
      date: null,
      dataSource: ds,
      modalEnable: false,
      newAptName: null,
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
    fetched = true;
  }

  onDateSelect(date){
    this.setState({date: date})
  }

  onAddAppointment(){
    this.setState({modalEnable: true});
  }

  closeModal(){
    this.setState({modalEnable: false});
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
    statusBarHeight = (Platform.OS === 'ios') ? 20 : 0;
    // Normal screen.
    if (fetched){
      return(
        <View style={styles.container}>
          <AddAppointmentModal modalEnable={this.state.modalEnable} self={this}/>
          <StatusBar barStyle='light-content' />
          <View style={{height: statusBarHeight, backgroundColor: "#B71C1C"}} />
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
          <Button style={styles.addButton} onPress={() => {this.onAddAppointment()}}>
            Add Appointment 
          </Button>
        </View>
      );
    // Loading appointments screen
    } else {
      return(
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={{height: statusBarHeight, backgroundColor: "#B71C1C"}} />
          <Calendar onDateSelect={(date) => this.onDateSelect(date)}
                    weekStart={0}
                    showControls={true}
          />
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <Text style={styles.loadingText}> Loading your appointments. </Text>
            <Spinner color='#B71C1C' />
            <View style={styles.listView} />
            <Button style={styles.addButton} onPress={() => {this.onAddAppointment()}}>
              Add Appointment 
            </Button>
          </View>
        </View>        
      );
    }
  }
}

module.exports = CalendarScreen;