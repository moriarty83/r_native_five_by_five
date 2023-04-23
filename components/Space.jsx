import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { useAppState } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const squareSize =
  windowWidth < windowHeight ? windowWidth / 5 - 5 : windowHeight / 5 - 5;

const Space = (props) => {
  const [text, setText] = useState(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

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
    if (state.activeSpace == props.index) {
      return [styles.letter, styles.activeLetter];
    } else if (
      (state.selectAcross && props.row == state.activeRow) ||
      (!state.selectAcross && props.col == state.activeCol)
    ) {
      return [styles.letter, styles.activeWord];
    } else {
      return [styles.letter, styles.inactiveLetter];
    }
  };

  return (
    <TouchableOpacity onPress={() => handleSpaceClick()}>
      <Text
        value={text}
        style={selectStyle()}
        onChangeText={(newText) => handleTextChange(newText)}
      >
        {state.chars[props.index]}
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
});

export default Space;
