import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Char from './Char';
import { InputContext } from './InputContext';

const windowWidth = Dimensions.get("window").width;

const Keyboard = (props) => {
  const [activeLetter, setActiveLetter] = useState(false);
  const [chars1] = useState(['q','w','e','r','t','y','u','i','o','p']);
  const [chars2] = useState(['a','s','d','f','g','h','j','k','l']);
  const [chars3] = useState(['\u21E5','z', 'x', 'c', 'v', 'b', 'n', 'm', '\u232B']);

  /////////// METHODS //////////
  const handleTextChange = (txt)=>{
    // update state
    // ...
  }

  const renderChar = ({ item }) => (
    <Char
      index={item}
      char={item}
    />
  );

  let renderStyles = props.isActiveLetter ? [styles.letter, styles.activeLetter] : props.isActiveWord ? [styles.letter, styles.activeWord]:[styles.letter, styles.inactiveLetter];

  return (
    <View style={styles.keyboard}>
      <View style={{height:55}}>
        <FlatList
          contentContainerStyle={styles.keyrow}
          data={chars1}
          renderItem={renderChar}
          numColumns={10}
        />
      </View>
      <View style={{height:55}}>
        <FlatList
          contentContainerStyle={styles.keyrow}
          data={chars2}
          renderItem={renderChar}
          numColumns={9}
        />
      </View>
      <View style={{height:60}}>
        <FlatList
          contentContainerStyle={styles.keyrow}
          data={chars3}
          renderItem={renderChar}
          numColumns={10}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard:{
    flex: 1,
    justifyContent: "flex-start",
    flexGrow: 0,
  },
  keyrow:{
    flex: 1,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    heigth: 0,
    flexGrow: 0,
  },
});

export default Keyboard;
