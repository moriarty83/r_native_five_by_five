import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { useAppState } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const squareSize =
  windowWidth < windowHeight ? windowWidth / 5 - 5 : windowHeight / 5 - 5;

const Space = (props) => {
  const { state, dispatch } = useAppState();

  /////////// METHODS //////////
  const handleSpaceClick = () => {
    console.log("handleSpaceClick");
    dispatch({
      type: "selectSpace",
      payload: {
        activeSpace: props.index,
        activeRow: props.row,
        activeCol: props.col,
      },
    });
  };

  const selectStyle = () => {
    let selectedStyles = [];
    if (state.activeSpace == props.index) {
      selectedStyles = [styles.letter, styles.activeLetter];
    } else if (
      (state.selectAcross && props.row == state.activeRow) ||
      (!state.selectAcross && props.col == state.activeCol)
    ) {
      selectedStyles = [styles.letter, styles.activeWord];
    } else {
      selectedStyles = [styles.letter, styles.inactiveLetter];
    }
    if (state.fixedChars[props.index.toString()]) {
      selectedStyles.push(styles.fixedLetter);
    }
    return selectedStyles;
  };

  const getChar = () => {
    return state.fixedChars[props.index.toString()]
      ? state.fixedChars[props.index.toString()]
      : state.chars[props.index];
  };

  return (
    <TouchableOpacity onPress={() => handleSpaceClick()}>
      <Text
        style={selectStyle()}
        onChangeText={(newText) => handleTextChange(newText)}
      >
        {getChar()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  letter: {
    width: squareSize,
    height: squareSize,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: "700",
  },
  activeLetter: {
    backgroundColor: "#f8d680",
  },
  activeWord: {
    backgroundColor: "#fbefd0",
  },
  inactiveLetter: {
    backgroundColor: "#fff",
  },
  fixedLetter: {
    textDecorationLine: "underline",
  },
});

export default Space;
