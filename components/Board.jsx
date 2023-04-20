import React, { Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import tw from 'twrnc';
import Space from './Space';

class Letter {
  constructor(index, row, column, fixed){
      this.index = index
      this.row = row,
      this.col = column
      this.fixed = fixed
      this.inWordAcross = false
      this.inWordDown = false
      this.score = 0
      this.selectedLetter = false
      this.text = null
  }
}

class Word {
  constructor(index, across, fixed){
      this.index = index,
      this.isAcross = across
      this.fixed = fixed
      this.wordExists = false
      this.inWordDown = false
      this.score = 0
      this.activeLetter = false
  }
}


const windowWidth= Dimensions.get('window').width
const windowHeifght = Dimensions.get('window').height

const GenerateLetters = ()=>{
  let letters = []
  let index = 0
    for(let i = 0; i < 5; i++){
      for (let j = 0; j < 5; j++){
        letter = new Letter(index, i, j, false)
        letters.push(letter)
        index += 1
      }
    }
  return letters
}


export default class Board extends Component {
  
  state = {
    letters: GenerateLetters(),
    selectedLetter: 0,
    selectAcross: true
  }

  renderSpace = ({item})=>(
    <Space key={item.key} row={item.row} col={item.col} index={item.index} clickLetter={this.letterClicked} isActiveLetter={item.selectedLetter}/>
    );

  letterClicked = (index)=>{
    console.log("Letter Clicked: " + index)
    this.state.selectedLetter = index
        // // 1. Make a shallow copy of the items
        let items = [...this.state.letters];
        for (item of items){
          if(item.index == index){
            item.selectedLetter = true
          }
          else{
            item.selectedLetter = false
          }
        }
        this.setState({letters: items})
        console.log(this.state.letters)
  }

  render() {
    return (
      <FlatList data={this.state.letters} renderItem={this.renderSpace} numColumns={5} contentContainerStyle={styles.container}>
        
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

