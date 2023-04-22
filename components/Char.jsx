import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import { InputContext } from './InputContext';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const charWidth =  windowWidth / 10 - 5

const onlyLettersAndNumbers = (str)=>{
  return /^[A-Za-z0-9]*$/.test(str);
}

const Char = (props) => {
    const { Input, setInput } = useContext(InputContext);


  const handleTextChange = (txt) => {
    setText(txt);
    if(text){
      setInput("W");
    }
  }

  const widthStyle = onlyLettersAndNumbers(props.char) ? styles.standardChar : styles.specialChar;

  return (
    <TouchableOpacity onPress={() => setInput(props.char)}>
      <Text style={[styles.char, widthStyle]} maxLength={1} >{props.char}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  char: {
    height: 48,
    margin: 2,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: "700",
    backgroundColor: '#bbbbbb',
  },
  standardChar:{
    width: charWidth,
  },
  specialChar:{
    width: charWidth*1.5,
  },
  container:{
    flex: 1,
    flexDirection: "row"
  }
});

export default Char;
