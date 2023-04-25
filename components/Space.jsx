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
    const char = state.chars[props.index];
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

    if (
      (char.across == true && char.down == true && char.fixed == false) ||
      (char.across == false && char.down == true && char.fixed == true) ||
      (char.across == true && char.down == false && char.fixed == true)
    ) {
      selectedStyles.push(styles.twoWords);
    } else if (
      (char.across == true && char.down == false && char.fixed == false) ||
      (char.across == false && char.down == true && char.fixed == false)
    ) {
      selectedStyles.push(styles.oneWord);
    } else if (char.across == true && char.down == true && char.fixed == true) {
      selectedStyles.push(styles.twoWordsFixed);
    }
    if (state.fixedChars[props.index.toString()]) {
      selectedStyles.push(styles.fixedLetter);
    }
    return selectedStyles;
  };

  const getChar = () => {
    return state.chars[props.index].char;
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
    backgroundColor: "#fff",
  },
  activeLetter: {
    borderColor: "#ffc229",
    borderWidth: 5,
  },
  activeWord: {
    borderColor: "#fddc88",
    borderWidth: 5,
  },
  inactiveLetter: {
    backgroundColor: "#fff",
  },
  fixedLetter: {
    textDecorationLine: "underline",
  },
  oneWord: {
    backgroundColor: "#99c98f",
  },
  twoWords: {
    backgroundColor: "#8b98fc",
  },
  twoWordsFixed: {
    backgroundColor: "#e0b14a",
  },
});

export default Space;

/*
palette_green = pygame.Color("#99c98f") 
palette_blue = pygame.Color("#8b98fc")
palette_cyan1 = pygame.Color("#2fa89e")
palette_cyan2 = pygame.Color("#5dc2b9")
palette_light_gray = pygame.Color("#fff1bd")
palette_dark_gray = pygame.Color("#3f3f3f")
palette_gold = pygame.Color("#e0b14a")
palette_purple = pygame.Color("#8460a3")
*/
