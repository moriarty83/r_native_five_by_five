import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Board from "./components/Board";
import Instructions from "./components/Instructions";
import { GameState } from "./AppState";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <GameState>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Game"
            component={Board}
            options={{ title: "Wordnigma" }}
          />
          <Stack.Screen
            name="Instructions"
            component={Instructions}
            options={{
              title: "How to Play",
            }}
          />
        </Stack.Navigator>
      </GameState>
    </NavigationContainer>
  );
}
