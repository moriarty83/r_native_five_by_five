import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useAppState } from "../AppState";
import Space from "./Space";
import Keyboard from "./Keyboard";
import WordCounter from "./WordCounter";
import ShareScore from "./ShareScore";

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

const Board = ({ navigation }) => {
  const { state, dispatch } = useAppState();
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
          onPress: () => {
            dispatch({
              type: "scoreGame",
              payload: {},
            });
          },
        },
      ],
      { cancelable: true }
    );
  };
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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <FlatList
          style={styles.flatList}
          data={GenerateLetters()}
          renderItem={renderSpace}
          numColumns={5}
        />
        <WordCounter style={styles.counter} />
      </View>
      <View style={styles.section}>
        {state.gameOver == false ? <Keyboard /> : null}

        {state.gameOver == false ? (
          <Pressable style={styles.button} onPress={clickFinish}>
            <Text style={styles.btnText}>Finsihed</Text>
          </Pressable>
        ) : (
          <>
            <Text style={styles.score}>
              Final Score: <Text style={styles.gold}>{state.totalScore}</Text>
            </Text>
            <Text>Click a word for score details.</Text>
            <ShareScore />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  flatList: {
    flexGrow: 0,
  },
  section: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
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
  score: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  gold: {
    color: "#e0b14a",
  },
});

export default Board;
