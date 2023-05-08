import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Char from "./Char";

const windowWidth = Dimensions.get("window").width;

const Keyboard = (props) => {
  const [activeLetter, setActiveLetter] = useState(false);
  const [chars1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
  const [chars2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"]);
  const [chars3] = useState([
    "\u21E5",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "\u232B",
  ]);

  /////////// METHODS //////////
  const handleTextChange = (txt) => {
    // update state
    // ...
  };

  const renderChar = ({ item }) => <Char index={item} char={item} />;

  return (
    <View style={styles.keyboard}>
      <View style={{ height: 55 }}>
        <FlatList
          contentContainerStyle={styles.keyrow}
          data={chars1}
          renderItem={renderChar}
          numColumns={10}
        />
      </View>
      <View style={{ height: 55 }}>
        <FlatList
          contentContainerStyle={styles.keyrow}
          data={chars2}
          renderItem={renderChar}
          numColumns={9}
        />
      </View>
      <View style={{ height: 55 }}>
        <FlatList
          contentContainerStyle={styles.keyrow}
          data={chars3}
          renderItem={renderChar}
          numColumns={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: "white",
  },
  keyrow: {
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 0,
  },
});

export default Keyboard;
