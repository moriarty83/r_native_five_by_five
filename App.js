import { createContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Board from "./components/Board";
import { AppState } from "./AppState";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Stack.Navigator>
          <Stack.Screen
            name="Game"
            component={Board}
            options={{ title: "Five by Five" }}
          />
        </Stack.Navigator>
      </AppState>
    </NavigationContainer>
  );
}
