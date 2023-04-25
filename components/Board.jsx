import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import Space from "./Space";
import Keyboard from "./Keyboard";
import { InputContext } from "./InputContext";

class Letter {
  constructor(index, row, column, fixed) {
    this.index = index;
    (this.row = row), (this.col = column);
    this.fixed = fixed;
    this.inWordAcross = false;
    this.inWordDown = false;
    this.score = 0;
    this.selectedLetter = false;
    this.text = null;
  }
}

class Word {
  constructor(index, across, fixed) {
    (this.index = index), (this.isAcross = across);
    this.fixed = fixed;
    this.wordExists = false;
    this.inWordDown = false;
    this.score = 0;
    this.activeLetter = false;
    this.activeWord = false;
  }
}

const GenerateLetters = () => {
  let letters = [];
  let index = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const letter = { index: index, row: i, col: j };
      letters.push(letter);
      index += 1;
    }
  }
  return letters;
};

const Board = (props) => {
  //////////// CONTEXT ////////////
  const inputContext = useContext(InputContext);
  //////////// STATE //////////////
  const [selectedLetter, setSelectedLetter] = useState(0);
  const [selectAcross, setSelectAcross] = useState(true);

  //////////// METHODS //////////
  const handleSpaceClicked = (index) => {
    let tempSelectAcross = selectAcross;
    if (selectedLetter == index) {
      tempSelectAcross = !tempSelectAcross;
      setSelectAcross(tempSelectAcross);
    }
    setSelectedLetter(index);
    // // 1. Make a shallow copy of the items
    let items = [...letters];
    for (let item of items) {
      if (item.index == index) {
        item.selectedLetter = true;
      } else {
        item.selectedLetter = false;
        // Check to see if the letter should have a secondary select color.
        if (tempSelectAcross) {
          if (item.row == items[index].row) {
            item.activeWord = true;
          } else {
            item.activeWord = false;
          }
        } else if (!tempSelectAcross) {
          if (item.col == items[index].col) {
            item.activeWord = true;
          } else {
            item.activeWord = false;
          }
        }
      }
    }
    setLetters(items);
  };

  const selectWord = () => {
    if (selectAcross) {
      let row = Math.floor(selectedLetter / 5);
      for (let i = row; i < row + 5; i++) {}
    }
  };
  ///////////// RENDER ////////////
  const renderSpace = ({ item }) => (
    <Space key={item.index} index={item.index} row={item.row} col={item.col} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={GenerateLetters()}
        renderItem={renderSpace}
        numColumns={5}
      />
      <Keyboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#333333",
    height: "75%",
  },
  flatList: {
    flexGrow: 0,
  },
});

export default Board;
