import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, StatusBar, 
        Modal, TextInput, Platform, TouchableOpacity,
        LayoutAnimation} from 'react-native';

import Calendar from 'react-native-calendar';
import {Button, Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import AddAppointmentModal from './AddAppointmentModal';

var styles = require('../StyleSheets/CalendarStyleSheet');
var fetched = false;
var statusBarHeight = null;
var events = [];

class CalendarScreen extends Component{
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
    this.state = {
      date: moment().format().split('T')[0],
      dataSource: ds,
      modalEnable: false,
      newAptName: null,
      loadEvents: null,
    };
    this.datesRef = this.getRef().child('dates');
    this.itemsRef = this.getRef().child('appointments/' + this.state.date);
  }

  getRef(){
    return this.props.firebaseApp.database().ref();
  }

  componentDidMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.listenForItems(this.itemsRef);
    this.listenForEvents(this.datesRef);
  }

  listenForEvents(datesRef) {
    datesRef.on('value', (snap) => {
      snap.forEach((child) => {
        events.push(
          child.val().Date
        );
      });
      this.setState({loadEvents: true});
    });
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          _key: child.key,
          Date: child.val().Date,
          Name: child.val().Name,
          Phone: child.val().Phone,
          Time: child.val().Time,
        });
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });
    });
    fetched = true;
  }

  addAppointment(name, time, phone) {
    this.itemsRef.push({
      Name: name,
      Time: time,
      Phone: phone,
      Date: this.state.date,
    });
    this.datesRef.push({
      Date: this.state.date,
    });
    this.setState({modalEnable: false});
  }

  onDateSelect(date){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({date: (date.split('T')[0])});
    this.itemsRef = this.getRef().child('appointments/' + date.split('T')[0]);
    this.listenForItems(this.itemsRef);
    this.listenForEvents(this.datesRef);
  }

  onAddAppointment(){
    this.setState({modalEnable: true});
  }

  onDeleteAppointment(rowData){
    this.itemsRef.child(rowData._key).remove();
  }

  closeModal(){
    this.setState({modalEnable: false});
  }

  _renderRow(feedRow){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    let time = feedRow.Time.split(':');
    var ampm = null;

    if (time[0] > 12) {
      time[0] -= 12; 
      ampm = 'PM';
    }
    else if (time[0] < 12) {
      ampm = 'AM';
    }
    else if (time[0] == 12) {
      ampm = 'PM';
    }
    
    return (
      <View style={styles.li}>
        <Text>
          {`Name: ${feedRow.Name}\nDate: ${feedRow.Date}\nTime: ${time[0]}:${time[1]} ${ampm}\nPhone: ${feedRow.Phone}`}
        </Text>
        <TouchableOpacity onPress={() => {this.onDeleteAppointment(feedRow)}}>
          <MaterialIcons name="delete" 
                         size={40} 
                         color='#B71C1C' 
                         style={styles.delete} 
          />
        </TouchableOpacity>
      </View> 
    );
  }

  render(){
    statusBarHeight = (Platform.OS === 'ios') ? 20 : 0;
    // Normal screen.
    if (fetched){
      return(
        <View style={styles.container}>
          {/* Pass it "this" so it has a reference to the parent state */}
          <AddAppointmentModal modalEnable={this.state.modalEnable} self={this}/>
          <StatusBar barStyle='light-content' />
          <View style={{height: statusBarHeight, backgroundColor: "#B71C1C"}} />
          <Calendar onDateSelect={(date) => this.onDateSelect(date)}
                    weekStart={0}
                    showControls={true}
                    showEventIndicators={true}
                    eventDates={events}
          />
          <ListView dataSource={this.state.dataSource}
                    renderRow={(feedRow) => { return this._renderRow(feedRow)}}
                    enableEmptySections={true}
                    style={styles.listView}
          />
          <Button style={styles.addButton} 
                  onPress={() => {this.onAddAppointment()}}
          >
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
                    showEventIndicators={true}
                    eventDates={events}
          />
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <Text style={styles.loadingText}> Loading your appointments. </Text>
            <Spinner color='#B71C1C' />
            <View style={styles.listView} />
            <Button style={styles.addButton}
                    onPress={() => {this.onAddAppointment()}}
            >
              Add Appointment 
            </Button>
          </View>
        </View>        
      );
    }
  }
}

module.exports = CalendarScreen;
