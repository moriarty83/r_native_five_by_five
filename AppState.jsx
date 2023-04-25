import React, { useReducer } from "react";
import Rando from "js-rando";
import dictionary from "./dictionary";

const rando = new Rando();

const dict = dictionary;

class letter {}

/////////////////////////
// INITIAL STATE
/////////////////////////
const initialFixed = genrateFixed();
const initialChars = generateChars();

const initialState = {
  activeSpace: 0,
  activeRow: 0,
  activeCol: 0,
  selectAcross: true,
  fixedChars: initialFixed,
  chars: generateChars(),
};

/////////////////////////
// REDUCER
/////////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action) => {
  let newState;
  console.log("reducer: ", action.type);
  switch (action.type) {
    /////////// SELECT SPACE ///////////
    case "selectSpace":
      payload =
        action.payload.activeSpace == state.activeSpace
          ? { selectAcross: !state.selectAcross }
          : action.payload;
      newState = { ...state, ...payload };
      return newState;

    /////////// ENTER LETTER ///////////
    case "enterLetter":
      // if 'tab', just advance the space.
      if (action.payload == "\u21E5") {
        return { ...state, ...getNextSpace(state) };
      }
      // Check to see if we hit delete
      const advance = action.payload != "\u232B" ? 1 : -1;
      // get nextSpace object based on whether or not we hit delete.
      const nextSpace = getNextSpace(state, advance);

      // If letter is fixed, just advance space, do nothing else.
      if (state.chars[state.activeSpace].fixed) {
        return { ...state, ...nextSpace };
      }

      // Make temporary chars
      let chars = [...state.chars];

      // Update temporary chars with action payload
      chars[state.activeSpace].char =
        action.payload == "\u232B" ? null : action.payload;

      // make new state
      chars = checkWords(state, chars);
      newState = { ...state, chars, ...nextSpace };
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

/////////////////////////
// METHODS
/////////////////////////

// Generate fixed letters
function genrateFixed() {
  fixed = {};
  while (Object.keys(fixed).length < 3) {
    fixed[rando.RandomInt(0, 25)] = String.fromCharCode(
      rando.RandomInt(65, 91)
    );
  }
  return fixed;
}

function generateChars() {
  chars = new Array(25).fill().map(() => {
    return { char: null, across: false, down: false, fixed: false };
  });
  for (let fixed in initialFixed) {
    chars[fixed].fixed = true;
    chars[fixed].char = initialFixed[fixed];
  }

  return chars;
}

function getNextSpace(state, advance = 1) {
  let nextSpace = {};
  if (state.selectAcross) {
    nextSpace["activeCol"] = (state.activeSpace + advance).mod(5);
    nextSpace["activeSpace"] = state.activeRow * 5 + nextSpace["activeCol"];
  } else {
    nextSpace["activeRow"] = (state.activeRow + advance).mod(5);
    nextSpace["activeSpace"] = nextSpace.activeRow * 5 + state["activeCol"];
  }
  return nextSpace;
}

function checkWords(state, chars) {
  let validAcross = false;
  let validDown = false;

  let acrossIndex = [];
  let downIndex = [];
  let across = "";
  let down = "";

  // Populate words with chars
  for (let i = 0; i < 5; i++) {
    acrossIndex.push(state.activeRow * 5 + i);
    downIndex.push(i * 5 + state.activeCol);
    across =
      chars[acrossIndex[i]].char != null
        ? across + chars[acrossIndex[i]].char
        : across;
    down =
      chars[downIndex[i]].char != null ? down + chars[downIndex[i]].char : down;
  }
  validAcross = across.length < 5 || !dict[across.toLowerCase()] ? false : true;
  validDown = down.length < 5 || !dict[down.toLowerCase()] ? false : true;
  for (let i = 0; i < 5; i++) {
    chars[downIndex[i]]["down"] = validDown;
    chars[acrossIndex[i]]["across"] = validAcross;
  }
  console.log(chars);
  return chars;
}

// New method to correct for negative modulo
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};
