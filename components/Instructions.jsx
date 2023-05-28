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
        Each day, 1 starting word randomly selected and placed on the board.
        When you've filled the board as best you can, click 'Finished' to end
        today's game and share your score. You'll be able to play again
        tomorrow with a new starting word.
        {"\n"}
      </Text>
      <Text style={styles.title}>Scoring</Text>
      <Text style={styles.text}>
        Each letter in a valid word is worth points. Letters that are part of the starting word worth
        fewer points that ones you enter yourself. The color of a space indicates
        how many points it is worth.{"\n"}
      </Text>
      <View style={styles.colorContainer}>
        <View style={styles.item}>
          <Text style={styles.colorText}>0 Points</Text>
        </View>
        <View style={[styles.item, styles.backgroundGreen]}>
          <Text style={styles.colorText}>5 Points</Text>
        </View>
        <View style={[styles.item, styles.backgroundBlue]}>
          <Text style={styles.colorText}>10 Points</Text>
        </View>
        <View style={[styles.item, styles.backgroundPurple]}>
          <Text style={styles.colorText}>15 Points</Text>
        </View>
        <View style={[styles.item, styles.backgroundGold]}>
          <Text style={styles.colorText}>20 Points</Text>
        </View>
      </View>
      <Text style={styles.text}>
        {"\n"}Additional points are also awarded for letter in the alphabet. The keyboard is also color coded to let you know how many points each is worth:
      </Text>
      <View style={styles.lettersContainer}>
        <View style={styles.lettersCol}>
          <View style={[styles.lettersHeader, styles.backgroundGray]}>

          <Text style={styles.lettersHeaderText}>1</Text>
          </View>
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
        <View style={[styles.lettersHeader, styles.backgroundGreen]}>

<Text style={styles.lettersHeaderText}>2</Text>
</View>
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
        <View style={[styles.lettersHeader, styles.backgroundBlue]}>

<Text style={styles.lettersHeaderText}>3</Text>
</View>
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
        <View style={[styles.lettersHeader, styles.backgroundPurple]}>

<Text style={styles.lettersHeaderText}>4</Text>
</View>
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
        <View style={[styles.lettersHeader, styles.backgroundGold]}>

<Text style={styles.lettersHeaderText}>5</Text>
</View>
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
    fontSize: 18,
  },
  lettersCol: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 24,
  },

  lettersHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    textAlign: "center",
    borderColor: "#333333",
    borderWidth: 2,
    padding: 2
  },
  lettersHeaderText:{
    fontWeight: "bold",
    fontSize: 20,
  },
  lettersContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#333333",
    borderWidth: 2,
    backgroundColor: "white",
    margin: 1,
    flexDirection: "row",
    width: 80,
    height: 80,
    margin: 8,
  },

  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  colorText: {
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
  },
  backgroundGreen: {
    backgroundColor: "#99c98f",
  },
  backgroundBlue: {
    backgroundColor: "#8b98fc",
  },
  backgroundPurple: {
    backgroundColor: "#b68fc9",
  },
  backgroundGold: {
    backgroundColor: "#e0b14a",
  },
  backgroundGray:{
    backgroundColor: "#bbbbbb",
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
