import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useAppState } from "../AppState";
import { useHeaderHeight } from "@react-navigation/elements";
import { letter_values } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
let squareSize = windowWidth < 390 ? windowWidth / 5 - 1 : 70;
console.log("window width: ", windowWidth)
const Space = (props) => {
  const { state, dispatch } = useAppState();
  const originalBoardHeight = (windowHeight - useHeaderHeight()) / 2
  const boardHeight = windowHeight > 1920 ? originalBoardHeight : originalBoardHeight * .9;
  if (windowWidth < 390 && boardHeight < windowWidth) {
    styles.letter.width = boardHeight / 5 - 3;
    styles.letter.height = boardHeight / 5 - 3;
    styles.letter.fontSize = 42;
  }

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
    let selectedStyles = [];
    const char = state.chars[props.index];
    if (state.gameOver == false) {
    }
    // Active Letter Styles
    if (state.activeSpace == props.index && state.select != "disabled") {
      selectedStyles = [styles.letter, styles.activeLetter];
    }
    // Active Row Styles
    else if (
      (state.select == "across" && props.row == state.activeRow) ||
      (state.select == "down" && props.col == state.activeCol)
    ) {
      selectedStyles = [styles.letter, styles.activeWord];
    } else {
      selectedStyles = [styles.letter, styles.inactiveLetter];
    }
    // Letter Score styles
    if ((char.char != null)&&
      (char.across == true || char.down == true) && 
      (char.across == true ||
      char.down == true)
    ) {
      const scoreStyle =
        letter_values[char.char] == 5
          ? styles.backgroundGold
          : letter_values[char.char] == 4
          ? styles.backgroundPurple
          : letter_values[char.char] == 3
          ? styles.backgroundBlue
          : letter_values[char.char] == 2
          ? styles.backgroundGreen
          : letter_values[char.char] == 1
          ? styles.backgroundYellow
          : styles.backgroundWhite;
      selectedStyles.push(scoreStyle);
    }

    return selectedStyles;
  };

  const getTextStyle = () => {
    if (windowWidth < 390) {
      styles.text.fontSize = 36 * boardHeight / originalBoardHeight
    }
    let textStyles = [styles.text];

    if (state.chars[props.index.toString()].fixed) {
      textStyles.push(styles.fixedLetter);
    }
    return textStyles;
  };

  const getChar = () => {
    if (state.gameOver && state.showScores) {
      if (!state.chars[props.index].fixed && !state.chars[props.index].char) {
        return null;
      }
      return state.scoredChars[props.index];
    } else {
      return state.chars[props.index].char;
    }
  };

  return (
    <View style={styles.opacity}>
      <TouchableOpacity style={selectStyle()} onPress={() => handleSpaceClick()}>
        <Text style={getTextStyle()} onChangeText={(newText) => handleTextChange(newText)} maxFontSizeMultiplier={1}>
          {getChar()}
        </Text>
        <Text style={styles.label}>
          {props.col == 0 && props.row == 0 ? 1 : props.row == 0 ? props.col + 1 : props.col == 0 ? props.row + 1 : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  opacity: {
    padding: 2,
  },
  letter: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    width: squareSize,
    height: squareSize,
    borderColor: "#333333",
    borderWidth: 1,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0.75,
      height: 0.75,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,

    fontWeight: "700",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 48,
  },
  label: {
    fontSize: 12,
    position: "absolute",
    top: 7,
    left: 7,
  },

  activeLetter: {
    borderColor: "#c22525",
    borderWidth: 4,
  },
  activeWord: {
    borderColor: "#818181",
    borderWidth: 4,
  },
  inactiveLetter: {
    backgroundColor: "#fff",
  },
  fixedLetter: {
    textDecorationLine: "underline",
  },
  backgroundGray: {
    backgroundColor: "#bbbbbb",
  },
  backgroundYellow:{
    backgroundColor: "#e6e697",
  },
  backgroundGreen: {
    backgroundColor: "#99c98f",
  },
  backgroundBlue: {
    backgroundColor: "#8b98fc",
  },
  backgroundGold: {
    backgroundColor: "#e0b14a",
  },
  backgroundPurple: {
    backgroundColor: "#b68fc9",
  },
  backgroundWhite: {
    backgroundColor: "#fff",
  },
  noLeftMargin: {},
  noRightMargin: {},
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
