import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { useAppState } from "../AppState";

const WordCounter = (props) => {
  //////////// STATE //////////////
  const { state, dispatch } = useAppState();

  const data = ["d", "3", "8"];
  //////////// METHODS //////////
  const string = "hello";
  ///////////// RENDER ////////////

  return (
    <View style={styles.counterparent}>
      <View styles={styles.counter}>
        <Text style={styles.whitetext}>Across</Text>
        {state.acrossWords.map((item, index) => {
          return (
            <View key={`${index}across`} style={styles.item}>
              <Text style={styles.whitetext}>{index + 1}</Text>
              <Text style={styles.greentext}>
                {state.acrossWords[index] == true ? "\u2713" : ""}
              </Text>
            </View>
          );
        })}
      </View>

      <View styles={styles.counter}>
        <Text style={styles.whitetext}>Down</Text>
        {state.downWords.map((item, index) => {
          return (
            <View key={`${index}down`} style={styles.item}>
              <Text style={styles.whitetext}>{index + 1}</Text>
              <Text style={styles.greentext}>
                {state.downWords[index] == true ? "\u2713" : ""}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterparent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    color: "white",
  },
  counter: {
    flexDirection: "column",
  },
  item: {
    flexDirection: "row",
  },
  whitetext: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
  },
  greentext: {
    paddingLeft: 20,
    color: "green",
    fontSize: 16,
    fontWeight: 900,
  },
  flatList: {
    flexGrow: 0,
  },
});

export default WordCounter;
