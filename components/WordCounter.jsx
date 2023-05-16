import React, { useContext, useState } from "react";
import {Alert, StyleSheet, Text, View, Button, FlatList, Dimensions } from "react-native";
import { useAppState } from "../AppState";

const windowWidth = Dimensions.get("window").width;
const counterWidth = windowWidth < 500 ? windowWidth : 500;

const WordCounter = (props) => {
  //////////// STATE //////////////
  const { state, dispatch } = useAppState();
  const itemStyle = windowWidth < 500 ? styles.itemMobile : styles.itemMablet;

  //////////// METHODS //////////
  const renderClear = ()=>{
    if(props.gameOver){
      return(<></>)
    }
    else{
      return(      <View >
        <Button  onPress={onClear} title="Clear" />
      </View>)
    }
  }
  const onClear = ()=>{
    Alert.alert(
      "Are you sure?",
      "Clear all letters.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            for(let char of state.chars){
              
            }
            dispatch({
              type: "clearLetters",
              payload: {},
            });
          },
        },
      ],
      { cancelable: true }
    );
  }
  ///////////// RENDER ////////////

  return (
    <View style={styles.counterparent}>
      <View styles={styles.counter}>
        <Text style={styles.blacktext} maxFontSizeMultiplier={1.5}>Across</Text>
        <View style={styles.items}>
          {state.acrossWords.map((item, index) => {
            return (
              <View
                key={`${index}across`}
                style={[
                  state.acrossWords[index] == true
                    ? styles.itemgreen
                    : styles.item,
                  itemStyle,
                ]}
              ></View>
            );
          })}
        </View>
      </View>
          {renderClear()}

      <View styles={styles.counter}>
        <Text maxFontSizeMultiplier={1.5} style={styles.blacktext}>Down</Text>
        <View style={styles.items}>
          {state.downWords.map((item, index) => {
            return (
              <View
                key={`${index}down`}
                style={[
                  state.downWords[index] == true
                    ? styles.itemgreen
                    : styles.item,
                  itemStyle,
                ]}
              ></View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterparent: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    width: counterWidth,
  },
  counter: {
    flexDirection: "column",
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    borderColor: "#333333",
    borderWidth: 2,
    backgroundColor: "white",
    margin: 1,
    flexDirection: "row",
  },
  itemMobile: {
    width: 20,
    height: 20,
  },
  itemTablet: {
    width: 40,
    height: 40,
  },
  itemgreen: {
    borderColor: "#333333",
    borderWidth: 2,
    width: 40,
    height: 40,
    backgroundColor: "green",
    margin: 1,
    flexDirection: "row",
  },
  blacktext: {
    color: "black",
    fontSize: 24,
    fontWeight: 700,
  },
  greentext: {
    paddingLeft: 20,
    color: "green",
    fontSize: 8,
    fontWeight: 900,
  },
  flatList: {
    flexGrow: 0,
  },
});

export default WordCounter;
