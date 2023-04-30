import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { useAppState } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const squareSize = windowWidth < 500 ? windowWidth / 5 - 1 : 100;

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
    let selectedStyles = [];
    const char = state.chars[props.index];
    if (state.gameOver == false) {
    }
    if (state.activeSpace == props.index && state.select != "disabled") {
      selectedStyles = [styles.letter, styles.activeLetter];
    } else if (
      (state.select == "across" && props.row == state.activeRow) ||
      (state.select == "down" && props.col == state.activeCol)
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
    if (props.index % 5 == 0) {
      selectedStyles.push(styles.noLeftMargin);
    }
    if (props.index % 5 == 4) {
      selectedStyles.push(styles.noRightMargin);
    }
    return selectedStyles;
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
    <TouchableOpacity onPress={() => handleSpaceClick()}>
      <Text
        style={selectStyle()}
        onChangeText={(newText) => handleTextChange(newText)}
      >
        {getChar()}
      </Text>
      <Text style={styles.label}>
        {props.col == 0 && props.row == 0
          ? 1
          : props.row == 0
          ? props.col + 1
          : props.col == 0
          ? props.row + 1
          : ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  letter: {
    width: squareSize,
    height: squareSize,
    borderColor: "#333333",
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: "700",
    backgroundColor: "#fff",
  },
  checkRow: {
    width: 20,
    height: squareSize,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    lineHeight: squareSize,
  },
  checkCol: {
    width: squareSize,
    height: 30,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    backgroundColor: "#333333",
  },
  showCheck: {
    color: "green",
  },
  label: {
    fontSize: 12,
    position: "absolute",
    top: 7,
    left: 7,
  },

  activeLetter: {
    borderColor: "#e0b14a",
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
  oneWord: {
    backgroundColor: "#99c98f",
  },
  twoWords: {
    backgroundColor: "#8b98fc",
  },
  twoWordsFixed: {
    backgroundColor: "#e0b14a",
  },
  noLeftMargin: {
    borderLeftColor: "white",
  },
  noRightMargin: {
    borderRightColor: "white",
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
