import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import tw from 'twrnc';


export default class Letter extends Component {
 
  render() {
    return (
      <TextInput style={styles.letter} maxLength={1}></TextInput>
    );
  }
}

const styles = StyleSheet.create({
  letter: {
    width: 65,
    height: 65,
    margin: 2,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: "700",
    backgroundColor: '#fff',
  }
});