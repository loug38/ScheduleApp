import React, {Component} from 'react';
import {View, Text, TextInput, Modal} from 'react-native';

import {Button, Input, InputGroup} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

var styles = require('../StyleSheets/AddAppointmentModalStyleSheet');

class AddAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Time:  null,
      PhoneNumber: null,
    };
  }

  _addAppointment(){
    return;
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

            {/* Name input */}
            <View style={styles.modalInputRow}>
              <MaterialIcons name="person-outline" size={30} color='#aaaaaa'
                             style={{marginTop: 10}} />
              <View style={styles.modalInputWrapper}>
                <InputGroup>
                  <Input placeholder='Name' 
                         onChangeText={(text) => this.setState({Name: text})}/>
                </InputGroup>
                </View>
            </View>

            {/* Time input */}
            <View style={styles.modalInputRow}>
              <MaterialIcons name="access-time" size={30} color='#aaaaaa' 
                             style={{marginTop: 10}}/>
              <View style={styles.modalInputWrapper}>
                <InputGroup>
                  <Input placeholder='Time' 
                         onChangeText={(text) => this.setState({Time: text})}/>
                </InputGroup>
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.modalInputRow}>
              <MaterialIcons name="phone" size={30} color='#aaaaaa' 
                             style={{marginTop: 10}}/>
              <View style={styles.modalInputWrapper}>
               <InputGroup>
                  <Input placeholder='Phone' 
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