import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useAppState } from "../AppState";
import Space from "./Space";
import Keyboard from "./Keyboard";
import WordCounter from "./WordCounter";
import ShareScore from "./ShareScore";

import { useHeaderHeight } from "@react-navigation/elements";
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

const windowHeight = Dimensions.get("window").height;

const Board = ({ navigation }) => {
  const { state, dispatch } = useAppState();
  const [focusState, setFocusState] = useState(AppState.currentState);

  const headerHeight = useHeaderHeight();
  const openInstructions = () => {
    navigation.navigate("Instructions");
  };
  const appStateListener = AppState.addEventListener(
    "change",
    (nextAppState) => {
      setFocusState(nextAppState);
    }
  );
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
  const loadState = async () => {
    const jsonValue = await AsyncStorage.getItem("state");
    const savedState = JSON.parse(jsonValue);
    tempToday = new Date().toLocaleDateString().slice(0, 11);
    if (
      jsonValue != null &&
      savedState.today &&
      savedState.today == tempToday
    ) {
      dispatch({
        type: "load",
        payload: savedState,
      });
    } else {
      dispatch({
        type: "newgame",
      });
    }
  };
  useEffect(() => {
    const getLoad = async () => {
      await loadState();
    };
    getLoad();
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        setFocusState(nextAppState);
        if (nextAppState == "active") {
          getLoad();
        }
      }
    );

    return () => {
      appStateListener?.remove();
    };
  }, []);
  // useEffect(() => {
  //   const getLoad = async () => {
  //     await loadState();
  //   };
  //   getLoad();
  // }, []);
  return (
    <View
      style={[styles.container, { height: windowHeight - useHeaderHeight() }]}
    >
      <View style={styles.section}>
        <WordCounter style={styles.counter} gameOver={state.gameOver}/>

        <FlatList
          style={styles.flatList}
          data={GenerateLetters()}
          renderItem={renderSpace}
          numColumns={5}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.section}>
        {state.gameOver == false ? <Keyboard /> : null}

        {state.gameOver == false ? (
          <Pressable style={styles.button} onPress={clickFinish}>
            <Text maxFontSizeMultiplier={1.5} style={styles.btnText}>Finished</Text>
          </Pressable>
        ) : (
          <>
            <Text style={styles.score}>
              Final Score: <Text style={styles.gold}>{state.totalScore}</Text>
            </Text>
            <Text>Tap board for score details.</Text>
            <ShareScore />
          </>
        )}
      </View>
      <TouchableOpacity
        style={styles.instructions}
        onPress={() => openInstructions()}
      >
        <Text style={styles.iconText}>?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
  instructions: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  iconText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Board;
