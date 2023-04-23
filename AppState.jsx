import React, { useReducer } from "react";
import Rando from "js-rando";

const rando = new Rando();

/////////////////////////
// INITIAL STATE
/////////////////////////
const genrateFixed = () => {
  fixed = {};
  while (Object.keys(fixed).length < 3) {
    fixed[rando.RandomInt(0, 25)] = String.fromCharCode(
      rando.RandomInt(65, 91)
    );
  }
  return fixed;
};
const initialState = {
  activeSpace: 0,
  activeRow: 0,
  activeCol: 0,
  selectAcross: true,
  chars: new Array(25),
  fixedChars: genrateFixed(),
};

/////////////////////////
// REDUCER
/////////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action) => {
  let newState;
  console.log("reducer: ", action.type);
  switch (action.type) {
    case "selectSpace":
      payload =
        action.payload.activeSpace == state.activeSpace
          ? { selectAcross: !state.selectAcross }
          : action.payload;
      newState = { ...state, ...payload };
      console.log(newState);
      return newState;

    case "enterLetter":
      // If letter is fixed, bail out!
      if (state.fixedChars[state.activeSpace.toString()]) {
        return state;
      }

      chars = [...state.chars];
      chars[state.activeSpace] = action.payload;
      newState = { ...state, chars };
      return newState;
    case "toggleDirection":
      newState = { ...state, myIngredients: action.payload };
      return newState;

    default:
      return state;
  }
};

/////////////////////////
// APPCONTEXT
/////////////////////////

// Provides state to everything
const AppContext = React.createContext(null);

/////////////////////////
// APP STATE COMPONENET
/////////////////////////
export function AppState(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

/////////////////////////
// USE APPSTATE HOOK
/////////////////////////
// Create a custom hook for app state

export const useAppState = () => {
  return React.useContext(AppContext);
};
