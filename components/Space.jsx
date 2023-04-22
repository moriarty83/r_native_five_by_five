import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const squareSize = windowWidth < windowHeight ? windowWidth / 5 - 5 : windowHeight / 5 - 5

const Space = (props) => {
  const [text, setText] = useState(null);
  const [selection, setSelection] = useState({start: 0, end: 0});

  /////////// METHODS //////////
  const handleTextChange = (txt)=>{
    setText(txt);
    if(txt){
      setSelection({start: 1, end: 1});
    }
    else{
      setSelection({start: 0, end: 0});
    }
  };

  let renderStyles = props.isActiveLetter ? [styles.letter, styles.activeLetter] : props.isActiveWord ? [styles.letter, styles.activeWord]:[styles.letter, styles.inactiveLetter];
  return (
    <TouchableOpacity onPress={()=>props.clickLetter(props.index)} >
      <Text onClick={() => console.log("Clicked")} value={text} style={renderStyles} maxLength={1} selection={selection} onChangeText={newText => handleTextChange(newText)}>{props.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  letter: {
    width: squareSize,
    height: squareSize,
    margin: 2,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: "700",
  },
  activeLetter:{
    backgroundColor: '#f8d680'
  },
  activeWord:{
    backgroundColor: '#fbefd0'
  },
  inactiveLetter:{
    backgroundColor: '#fff'
  },
});

export default Space;
