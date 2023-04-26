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
import { InputContext } from "./InputContext";

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

  let renderStyles = props.isActiveLetter
    ? [styles.letter, styles.activeLetter]
    : props.isActiveWord
    ? [styles.letter, styles.activeWord]
    : [styles.letter, styles.inactiveLetter];

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
      <View style={{ height: 60 }}>
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
  keyboard: {},
  keyrow: {
    flex: 1,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    height: 0,
    flexGrow: 0,
  },
});

export default Keyboard;
