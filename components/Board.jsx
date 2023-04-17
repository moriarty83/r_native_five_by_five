import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import tw from 'twrnc';
import Letter from './Letter';

const GenerateLetters = ()=>{
    let letters = []
    for(let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            letters.push({
                key: `${i}${j}`,
                row: i,
                col: j,
                char: null
            })
        }
    }
    return letters
}

const renderLetter = ({item})=>(
    <Letter key={item.key} row={item.row} col={item.col}/>
    );

console.log(GenerateLetters())
export default class Board extends Component {
  render() {
    return (
      <FlatList data={GenerateLetters()} renderItem={renderLetter} numColumns={5} contentContainerStyle={styles.container}>
        
      </FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  }
});