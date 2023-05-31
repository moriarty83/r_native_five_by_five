import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useAppState } from "../AppState";
import { letter_values } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const charWidth = windowWidth / 10 - 4;


const onlyLettersAndNumbers = (str) => {
  ``;
  return /^[A-Za-z0-9]*$/.test(str);
};

const Char = (props) => {
  const { state, dispatch } = useAppState();

  const handleCharClick = () => {
    dispatch({ type: "enterLetter", payload: props.char });
  };

  const widthStyle = onlyLettersAndNumbers(props.char)
    ? styles.standardChar
    : styles.specialChar;
  const backgroundStyle = letter_values[props.char] == 5 ? styles.backgroundGold : letter_values[props.char] == 4 ? styles.backgroundPurple : letter_values[props.char] == 3 ? styles.backgroundBlue : letter_values[props.char] == 2 ? styles.backgroundGreen : letter_values[props.char] == 1 ? styles.backgroundYellow : styles.backgroundGray
  return (
    <TouchableOpacity style={[styles.opacity, widthStyle, backgroundStyle]} onPress={() => handleCharClick()}>
      <Text style={styles.char} maxLength={1} maxFontSizeMultiplier={1}>
        {props.char}
      </Text>
    </TouchableOpacity>
  );
};

//Green: #9cb8a5, //Blue: #9cb1b8, //Gold: #b8b39c, //Purple: #ae9cb8

const styles = StyleSheet.create({
  opacity:{
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', //Centered horizontally
    height: 48,
    margin: 2,
    borderColor: "#333333",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
shadowOpacity: 1,
shadowRadius: 0.5,
  },
  char: {
    
    
    textAlign: "center",
    fontSize: 32,
    fontWeight: "700",
    
  },
  standardChar: {
    width: charWidth,
  },
  specialChar: {
    width: charWidth * 1.5,
  },
  container: {
    flexDirection: "row",
  },
  backgroundGray:{
    backgroundColor: "#bbbbbb",
  },
  backgroundYellow:{
    backgroundColor: "#e6e697",
  },
  backgroundGreen:{
    backgroundColor: "#99c98f",
  },
  backgroundBlue:{
    backgroundColor: "#8b98fc",
  },
  backgroundGold:{
    backgroundColor: "#e0b14a",
  },
  backgroundPurple:{
    backgroundColor: "#b68fc9",
  },
  
});

export default Char;
