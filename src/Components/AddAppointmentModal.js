import React, {Component} from 'react';
import {View, Text, TextInput, Modal} from 'react-native';

import {Button} from 'native-base';

var styles = require('../StyleSheets/AddAppointmentModalStyleSheet');

class AddAppointmentModal extends Component {
  render(){
    return(
      <Modal animationType={"slide"}
        transparent={true}
        visible={this.props.modalEnable}
      >
      <View style={styles.modal}>
        <View style={styles.modalInputContainer}>
          <Text style={styles.modalTitle}> Add a new appointment </Text>
          {/* Name input */}
          <View style={styles.modalInputRow}>
            <Text style={{paddingTop: 3}}> Name: </Text>
            <View style={styles.modalInputWrapper}>
              <TextInput style={styles.modalInput}
                         onChangeText={(text) => this.setState({Name: text})}
                         placeholder='Name'
              />
            </View>
          </View>
          {/* Time input */}
          <View style={styles.modalInputRow}>
            <Text style={{paddingTop: 3}}> Time: </Text>
            <View style={styles.modalInputWrapper}>
              <TextInput style={styles.modalInput}
                         onChangeText={(text) => this.setState({Time: text})}
                         placeholder='Time'
              />
            </View>
          </View>
          {/* Phone Number */}
          <View style={styles.modalInputRow}>
            <Text style={{paddingTop: 3}}> Phone: </Text>
            <View style={styles.modalInputWrapper}>
              <TextInput style={styles.modalInput}
                         onChangeText={(text) => this.setState({PhoneNumber: text})}
                         placeholder='Just digits'
              />
            </View>
          </View>
        </View> 
        <View style={styles.buttonsContainers}>
        </View>
      </View>
    </Modal>
    );
  }
}

module.exports = AddAppointmentModal;