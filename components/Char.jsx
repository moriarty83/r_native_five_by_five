import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useAppState } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const charWidth = windowWidth / 10 - 4;

console.log(windowHeight);

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
  return (
    <TouchableOpacity style={[styles.opacity, widthStyle]} onPress={() => handleCharClick()}>
      <Text style={styles.char} maxLength={1} maxFontSizeMultiplier={1}>
        {props.char}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  opacity:{
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', //Centered horizontally
    backgroundColor: "#bbbbbb",
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
});

export default Char;
