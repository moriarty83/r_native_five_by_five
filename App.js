import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Board from "./components/Board";
import Instructions from "./components/Instructions";
import { AppState } from "./AppState";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Game"
            component={Board}
            options={{ title: "Five by Five" }}
          />
          <Stack.Screen
            name="Instructions"
            component={Instructions}
            options={{
              title: "How to Play",
            }}
          />
        </Stack.Navigator>
      </AppState>
    </NavigationContainer>
  );
}
