import { createContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Board from "./components/Board";
import { InputContext } from "./components/InputContext";
import { AppState } from "./AppState";

export default function App() {
  const [Input, setInput] = useState();
  const value = { Input, setInput };
  return (
    <AppState>
      <View style={styles.container}>
        <InputContext.Provider value={value}>
          <Board style={{ flex: 1 }} />
        </InputContext.Provider>
      </View>
    </AppState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
