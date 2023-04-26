import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import Space from "./Space";
import Keyboard from "./Keyboard";
import WordCounter from "./WordCounter";
import { InputContext } from "./InputContext";

const GenerateLetters = () => {
  let letters = [];
  let index = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const type = i == 0 ? "colCheck" : j == 0 ? "rowCheck" : "space";
      const letter = { index: index, row: i - 1, col: j - 1, type: type };
      letters.push(letter);
      if (type == "space") {
        index += 1;
      }
    }
  }
  return letters;
};

const Board = (props) => {
  ///////////// RENDER ////////////
  const renderSpace = ({ item }) => (
    <Space
      key={item.index}
      index={item.index}
      row={item.row}
      col={item.col}
      type={item.type}
    />
  );

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "start",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#333333",
    height: "50%",
  },
  flatList: {
    flexGrow: 0,
  },
});

export default Board;
