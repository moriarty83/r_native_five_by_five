import { createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './components/Board';
import {InputContext} from './components/InputContext';

export default function App() {
  const [Input, setInput] = useState()
  const value = { Input, setInput }
  console.log(Input)
  return (
      <View style={styles.container}>
        <InputContext.Provider value={value} >
        <Board style={{flex: 1}} />
        </InputContext.Provider>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    flexDirection: "row",
    justifyContent: "flex-start",
    
  },

});
