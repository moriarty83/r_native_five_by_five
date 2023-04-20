import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';


export default class Space extends Component {
  

  constructor(props){
    super(props)
    console.log(props)
    this.state = {
    activeLetter: false,
    text: null,
    inWordAcross: false,
    inWordDown: false,
    score: 0,
    selection: {start: 0, end: 0}
  };
}

  /////////// METHODS //////////
  handleTextChange = (txt)=>{
    this.setState({text: txt})
    if(this.state.text){
      this.setState({selection: {start: 1, end: 1}})
    }
    else{
      this.setState({selection: {start: 0, end: 0}})
    }
  }

  render() {
    let renderStyles = this.props.isActiveLetter ? [styles.letter, styles.activeLetter] : [styles.letter, styles.inactiveLetter]
    return (
      <TouchableOpacity onPress={()=>this.props.clickLetter(this.props.index)} onClick={() => this.props.clickLetter(244)}>
        <Text onClick={() => console.log("Clicked")} value={this.state.text} style={renderStyles} maxLength={1} selection={this.state.selection} onChangeText={newText => this.handleTextChange(newText)}></Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  letter: {
    width: 65,
    height: 65,
    margin: 2,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: "700",
    backgroundColor: '#fff',
  },
  activeLetter:{
    backgroundColor: '#ffe093'
  },
  inactiveLetter:{
    backgroundColor: '#fff'
  }
});