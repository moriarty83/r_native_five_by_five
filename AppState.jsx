import React, { useReducer } from "react";
import Rando from "js-rando";
import dictionary from "./dictionary";

// const rando = new Rando();
import { XORShift } from "random-seedable";

const today = new Date().toLocaleDateString().slice(0, 11);

console.log("today: ", today);
const rando = new XORShift(today.split("/").join(""));
const dict = dictionary;

letter_values = {
  E: 1,
  A: 1,
  S: 1,
  O: 1,
  T: 1,

  I: 2,
  R: 2,
  N: 2,
  L: 2,
  D: 2,

  U: 3,
  P: 3,
  M: 3,
  C: 3,
  G: 3,

  Y: 4,
  B: 4,
  H: 4,
  K: 4,
  W: 4,

  F: 5,
  V: 5,
  Z: 5,
  X: 5,
  Q: 5,
  J: 5,
};

/////////////////////////
// INITIAL STATE
/////////////////////////
const initialFixed = genrateFixed();
const selectStates = ["across", "down", "disabled"];
const initialState = {
  today: today,
  activeSpace: 0,
  activeRow: 0,
  activeCol: 0,
  selectAcross: true,
  select: selectStates[0],
  fixedChars: initialFixed,
  chars: generateChars(),
  acrossWords: new Array(5).fill(false),
  downWords: new Array(5).fill(false),
  scoredChars: new Array(5).fill(0),
  totalScore: 0,
  gameOver: false,
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
      console.log(action.payload.activeSpace);
      select = state.select;
      payload = action.payload;
      if (
        state.gameOver == true &&
        action.payload.activeSpace == state.activeSpace
      ) {
        payload["select"] =
          selectStates[(selectStates.indexOf(state.select) + 1) % 3];
      } else {
        if (action.payload.activeSpace == state.activeSpace) {
          payload["select"] =
            selectStates[(selectStates.indexOf(state.select) + 1) % 2];
        }
      }

      newState = { ...state, ...payload };
      console.log(newState.activeSpace);
      return newState;

    /////////// ENTER LETTER ///////////
    case "enterLetter":
      console.log("active spave 100: ", state.activeSpace);
      const spaceToFill = state.activeSpace;
      if (action.payload == "\u21E5") {
        return { ...state, ...getNextSpace(state) };
      }
      // Check to see if we hit delete
      const advance =
        action.payload != "\u232B"
          ? 1
          : state.chars[state.activeSpace].char != null &&
            state.chars[state.activeSpace].fixed == false
          ? 0
          : -1;
      // get nextSpace object based on whether or not we hit delete.
      const nextSpace = getNextSpace(state, advance);
      console.log("space to fill115: ", spaceToFill);

      // If letter is fixed, just advance space, do nothing else.
      if (state.chars[spaceToFill].fixed) {
        console.log("renturning 117");
        return { ...state, ...nextSpace };
      }

      // Make temporary chars
      let chars = [...state.chars];

      // Update temporary chars with action payload
      chars[spaceToFill].char =
        action.payload == "\u232B" ? null : action.payload;

      // make new state
      checkedWords = checkWords(state, chars);
      newState = { ...state, ...checkWords, ...nextSpace };
      return newState;
    case "toggleDirection":
      newState = { ...state };
      return newState;

    /////////// SCORE GAME ///////////
    case "scoreGame":
      totalScore = scoreGame(state);
      newState = { ...state, ...totalScore };
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
    fixed[rando.randRange(0, 24)] = String.fromCharCode(
      rando.randRange(65, 90)
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

function getNextSpace(
  state,
  advance = 1,
  nextSpace = {
    activeSpace: state.activeSpace,
    activeCol: state.activeCol,
    activeRow: state.activeRow,
  }
) {
  newAdvance = advance;
  console.log("getNextSpave");
  console.log(newAdvance);

  if (state.select == "across") {
    nextSpace["activeCol"] = (state.activeSpace + advance).mod(5);
    nextSpace["activeSpace"] = state.activeRow * 5 + nextSpace["activeCol"];
  } else {
    nextSpace["activeRow"] = (state.activeRow + advance).mod(5);
    nextSpace["activeSpace"] = nextSpace.activeRow * 5 + state["activeCol"];
  }
  if (state.chars[nextSpace.activeSpace].fixed == true) {
    state.activeRow = nextSpace.activeRow;
    state.activeCol = nextSpace.activeCol;
    state.activeSpace = nextSpace.activeSpace;
    return getNextSpace(state, newAdvance, nextSpace);
  } else {
    return nextSpace;
  }
}

function checkWords(state, chars) {
  let validAcross = false;
  let validDown = false;
  let acrossWords = state.acrossWords;
  let downWords = state.downWords;

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
  downWords[state.activeCol] = validDown;
  acrossWords[state.activeRow] = validAcross;
  return { chars: chars, downWords: downWords, acrossWords: acrossWords };
}

function scoreGame(state) {
  let totalScore = 0;
  let scoredChars = state.scoredChars;
  for (let i = 0; i < 25; i++) {
    let score = 0;
    if (state.chars[i].across == true || state.chars[i].down == true) {
      if (state.chars[i].across == true) {
        score += 5;
        console.log("Across score");
      }
      if (state.chars[i].down == true) {
        score += 5;
        console.log("Down score");
      }
      if (state.chars[i].fixed == true) {
        score += 5;
        console.log("Fixed score");
      }
      if (
        state.chars[i].down == true &&
        state.chars[i].across == true &&
        state.chars[i].fixed == true
      ) {
        console.log("double fixed score");

        score += 5;
      }
      score += letter_values[state.chars[i].char];
    }
    scoredChars[i] = score;
    totalScore += score;
  }
  return {
    totalScore: totalScore,
    gameOver: true,
    scoredChars: scoredChars,
    select: selectStates[2],
  };
}

// New method to correct for negative modulo
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};
