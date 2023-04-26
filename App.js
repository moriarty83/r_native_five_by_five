import { createContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
  Alert,
} from "react-native";
import Space from "./components/Space";
import Keyboard from "./components/Keyboard";
import WordCounter from "./components/WordCounter";
import { AppState } from "./AppState";

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

export default function App() {
  const clickFinish = () => {
    Alert.alert(
      "Are you sure?",
      "Finish and score your game.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            dispatch({
              type: "scoreGame",
              payload: {
                activeSpace: props.index,
                activeRow: props.row,
                activeCol: props.col,
              },
            }),
        },
      ],
      { cancelable: true }
    );
  };

  const renderSpace = ({ item }) => (
    <Space
      key={item.index}
      index={item.index}
      row={item.row}
      col={item.col}
      type={item.type}
    />
  );

  return (
    <AppState>
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={GenerateLetters()}
          renderItem={renderSpace}
          numColumns={5}
        />
        <Keyboard />
        <WordCounter />
        <Pressable style={styles.button} onPress={clickFinish}>
          <Text style={styles.btnText}>Finsihed</Text>
        </Pressable>
      </View>
    </AppState>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 60,
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#333333",
  },
  flatList: {
    flexGrow: 0,
  },
  button: {
    marginTop: 8,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
    width: 180,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
