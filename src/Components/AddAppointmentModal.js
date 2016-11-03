import React, {Component} from 'react';
import {View, Text, TextInput, Modal} from 'react-native';

import {Button, Input, InputGroup} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';

var styles = require('../StyleSheets/AddAppointmentModalStyleSheet');

class AddAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Time:  null,
      PhoneNumber: null,
      errorMessage: null,
    };
  }

  _addAppointment(){
    if (this.state.Name === null) {
      this.setState({errorMessage: 'Name is required'});
      return;
    }
    if (this.state.Time === null)  {
      this.setState({errorMessage: 'An appointment time is required'});
      return;
    }
    if (this.state.PhoneNumber === null){
      this.setState({errorMessage: 'A phone number is required'});
      return;
    }
    this.props.self.addAppointment(
      this.state.Name,
      this.state.Time,
      this.state.PhoneNumber
    );
  };

  _exitModal(){
    this.props.self.closeModal();
    return;
  }

  render(){
    return(
      <Modal animationType={"slide"}
             transparent={true}
             visible={this.props.modalEnable}
             onRequestClose={() => null}
      >
        <View style={styles.modal}>
          <View style={styles.modalInputContainer}>
            <Text style={styles.modalTitle}> Add a new appointment </Text>
            <Text style={{color: '#B71C1C', alignSelf: 'center'}}> {this.state.errorMessage} </Text>
            {/* Name input */}
            <View style={styles.modalInputRow}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="person-outline" size={30} color='#ffffff'
                               style={{backgroundColor: 'transparent'}} />
              </View>
              <View style={styles.modalInputWrapper}>
                <InputGroup>
                  <Input placeholder='Name' 
                         onChangeText={(text) => this.setState({Name: text})}/>
                </InputGroup>
                </View>
            </View>

            {/* Time input */}
            <View style={styles.modalInputRow}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="access-time" size={30} color='#ffffff' 
                               style={{backgroundColor: 'transparent'}} />
              </View>
              <DatePicker style={{flex: 1, paddingLeft: 10}} 
                          mode='time' confirmBtnText='Confirm' cancelBtnText='Cancel' 
                          placeholder='pick a time'
                          onDateChange={(time) => this.setState({Time: time})} />
            </View>

            {/* Phone Number */}
            <View style={styles.modalInputRow}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="phone" size={30} color='#ffffff' 
                               style={{backgroundColor: 'transparent'}} />
              </View>
              <View style={styles.modalInputWrapper}>
               <InputGroup>
                  <Input placeholder='Phone' 
                         keyboardType='numeric'
                         onChangeText={(text) => this.setState({PhoneNumber: text})}/>
                </InputGroup>
              </View>
            </View>

            {/* Buttons on the bottom */}
            <View style={styles.buttonContainer}>
              <Button style={styles.modalButtonCancel} onPress={() => this._exitModal()}>
                Cancel
              </Button>
              <Button style={styles.modalButtonAdd} onPress={() => this._addAppointment()}>
                Add
              </Button>
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

module.exports = AddAppointmentModal;