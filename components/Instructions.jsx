import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { letter_values } from "../AppState";

const Instructions = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        Fill in the board with as many 5-letter English words as possible.
        {"\n\n"}
        Each day, 3 Fixed letters are randomly selected and placed on the board.
        When you've filled the board as best you can, click 'Finished' to end
        today's game and recieve your score. You'll be able to play again
        tomorrow with a new set of Fixed letters.
        {"\n"}
      </Text>
      <Text style={styles.title}>Scoring</Text>
      <Text style={styles.text}>
        Each letter in a valid word is worth points. Fixed letters are worth
        more points that ones you enter yourself. The color of a space indicates
        how many points it is worth.{"\n"}
      </Text>
      <View style={styles.colorContainer}>
        <View style={styles.item}>
          <Text style={styles.colorText}>0 Points</Text>
        </View>
        <View style={[styles.item, styles.oneWord]}>
          <Text style={styles.colorText}>5 Points</Text>
        </View>
        <View style={[styles.item, styles.twoWords]}>
          <Text style={styles.colorText}>10 Points</Text>
        </View>
        <View style={[styles.item, styles.twoWordsFixed]}>
          <Text style={styles.colorText}>20 Points</Text>
        </View>
      </View>
      <Text style={styles.text}>
        {"\n"}Each letter in the alphabet is also worth points.
      </Text>
      <View style={styles.lettersContainer}>
        {/*
         */}
        <View style={styles.lettersCol}>
          <Text style={styles.lettersHeader}>1{"\n"}Point</Text>
          {Object.keys(letter_values).map((key) => {
            if (letter_values[key] == 1)
              return (
                <Text style={styles.text} key={key}>
                  {key}
                </Text>
              );
          })}
        </View>
        <View style={styles.lettersCol}>
          <Text style={styles.lettersHeader}>2{"\n"}Points</Text>
          {Object.keys(letter_values).map((key) => {
            if (letter_values[key] == 2)
              return (
                <Text style={styles.text} key={key}>
                  {key}
                </Text>
              );
          })}
        </View>
        <View style={styles.lettersCol}>
          <Text style={styles.lettersHeader}>3{"\n"}Points</Text>
          {Object.keys(letter_values).map((key) => {
            if (letter_values[key] == 3)
              return (
                <Text style={styles.text} key={key}>
                  {key}
                </Text>
              );
          })}
        </View>

        <View style={styles.lettersCol}>
          <Text style={styles.lettersHeader}>4{"\n"}Points</Text>
          {Object.keys(letter_values).map((key) => {
            if (letter_values[key] == 4)
              return (
                <Text style={styles.text} key={key}>
                  {key}
                </Text>
              );
          })}
        </View>

        <View style={styles.lettersCol}>
          <Text style={styles.lettersHeader}>5{"\n"}Points</Text>
          {Object.keys(letter_values).map((key) => {
            if (letter_values[key] == 5)
              return (
                <Text style={styles.text} key={key}>
                  {key}
                </Text>
              );
          })}
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
  lettersCol: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  lettersHeader: {
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  lettersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#333333",
    borderWidth: 2,
    backgroundColor: "white",
    margin: 1,
    flexDirection: "row",
    width: 60,
    height: 60,
  },

  colorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  colorText: {
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
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
  iconText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  back: {
    marginTop: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
    left: 15,
    bottom: 30,
  },
});

export default Instructions;

// 2190
