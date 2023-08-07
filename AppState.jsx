import React, { useReducer } from "react";
import dictionary from "./dictionary";
import startWords from "./startWords";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const rando = new Rando();
import { XORShift } from "random-seedable";

const today = new Date().toLocaleDateString().slice(0, 11);

let rando = new XORShift(today.split("/").join(""));
let startWord = null
const dict = dictionary;
const startingWords = startWords;

export const letter_values = {
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

export const fetchStartWord = ()=>{return startWord}

/////////////////////////
// INITIAL STATE
/////////////////////////
const selectStates = ["across", "down", "disabled"];
const initialState = {
  today: today,
  activeSpace: 0,
  activeRow: 0,
  activeCol: 0,
  fixedAcross: true,
  fixedIndex: 0,
  selectAcross: true,
  select: selectStates[0],
  chars: new Array(25).fill().map(() => {
    return { char: null, across: false, down: false, fixed: false };
  }),
  acrossWords: new Array(5).fill(false),
  downWords: new Array(5).fill(false),
  scoredChars: new Array(25).fill(0),
  showScores: false,
  totalScore: 0,
  gameOver: false,
};

const initialCheckedWords = checkWords(initialState, initialState.chars)
initialState.chars = initialCheckedWords.chars
initialState.acrossWords = initialCheckedWords.acrossWords
initialState.downWords = initialCheckedWords.downWords


/////////////////////////
// REDUCER
/////////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action) => {
  let newState;
  console.log("reducer: ", action.type);
  switch (action.type) {
    /////////// LOAD GAME ////////////
    case "load":
      
      return { ...action.payload };
    ///////////// NEW GAME /////////////
    case "newgame":
      const newToday = new Date().toLocaleDateString().slice(0, 11);
      rando = new XORShift(newToday.split("/").join(""));
      newState = {...initialState}
      newState.today = newToday
      newState ={...newState, ...generateChars()}
      checkedWords = checkWords(newState, newState.chars)
      newState = {...newState, ...checkedWords}
      newState.totalScore = scoreGame(newState, false).totalScore
      saveState({...newState, ...checkWords})
      return {...newState, ...checkWords};
    /////////// SELECT SPACE ///////////
    case "selectSpace":
      select = state.select;
      payload = action.payload;
      if (state.gameOver == true) {
        let showScores = !state.showScores;
        return { ...state, showScores };
      } else {
        if (action.payload.activeSpace == state.activeSpace) {
          payload["select"] =
            selectStates[(selectStates.indexOf(state.select) + 1) % 2];
        }
      }
      
      newState = { ...state, ...payload };
      return newState;

    /////////// ENTER LETTER ///////////
    case "enterLetter":
      const spaceToFill = state.activeSpace;
      // Check to see if we hit tab.
      if (action.payload == "\u21E5") {
        return { ...state, ...getNextSpace(state) };
      }
      // Check to see if we hit delete
      const advance =
        action.payload != "\u232B"
          ? 1 :
          state.chars[state.activeSpace]["char"] != null ? 0 :  -1;
      // get nextSpace object based on whether or not we hit delete.

      // If letter is fixed, just advance space, do nothing else.
      if (state.chars[spaceToFill].fixed) {
        return { ...state, ...getNextSpace(state, advance) };
      }
      
      // Make temporary chars
      let chars = [...state.chars];

      // Update temporary chars with action payload
      chars[spaceToFill].char =
        action.payload == "\u232B" ? null : action.payload;

      // make new state
      checkedWords = checkWords(state, chars);
      newState = {
        ...state,
        ...checkWords,
        ...getNextSpace(state, advance),
      };
      currentScore = scoreGame(newState, false);
      newState.totalScore = currentScore.totalScore
      saveState(newState);

      return newState;
    case "toggleDirection":
      newState = { ...state };
      return newState;

    case "clearLetters":
      newState = { ...state }
      chars = state.chars
      acrossWords = new Array(5).fill(false)
      downWords = new Array(5).fill(false)
      scoredChars = new Array(25).fill(0)
      for(let char of chars){
        if(!char.fixed){
          char.char = null
          char.across = false
          char.down = false
        }
      }
      checkedWords = checkWords(state, chars);
      currentScore = scoreGame(newState, false);
      newState.totalScore = currentScore.totalScore
      saveState(newState);
      return {...newState, chars, acrossWords, downWords, ...checkedWords, scoredChars}
    /////////// SCORE GAME ///////////
    case "scoreGame":
      totalScore = scoreGame(state, true);
      newState = { ...state, ...totalScore };
      saveState(newState);

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
export function GameState(props) {
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
function generateFixedDirection() {
  const across = rando.randRange(0, 2) == 0 ? true : false
  return across
}

function generateFixedIndex() {
  const wordIndex = rando.randRange(0, 4)
  return wordIndex
}

// Generate fixed letters
function genrateFixed() {
  const day = new Date().getDay()
  const maxFixed = day > 3 ? 2 : day > 0 ? 1 : 3 
  fixed = {}
  while (Object.keys(fixed).length < maxFixed) {
    fixed[rando.randRange(0, 24)] = String.fromCharCode(
      rando.randRange(65, 90)
    );
  }
  return fixed;
}

// Get Starting Word
function getStartWord() {
  const wordsLength = Object.keys(startingWords).length
  const keys = Object.keys(startingWords);
  let firstWord = ''
  let length = firstWord.length
  
  while (length != 5) {
    firstWord = keys[rando.randRange(0, wordsLength)]
    length = firstWord.length

  }
  
  firstWord = firstWord.toUpperCase()
  return firstWord;
}

async function saveState(newState) {
  try {
    const jsonValue = JSON.stringify(newState);
    await AsyncStorage.setItem("state", jsonValue);
  } catch (e) {
    // save error
  }
}
function generateChars() {
  chars = new Array(25).fill().map(() => {
    return { char: null, across: false, down: false, fixed: false };
  });
  startWord = getStartWord()
  const fixedAcross = generateFixedDirection()
  const fixedIndex = generateFixedIndex()
  for (let i = 0; i < startWord.length; i++) {
    if(fixedAcross == true){
      char = chars[5*fixedIndex + i]
    }
    else{
      char = chars[i*5+fixedIndex]
    }
    char.fixed = true;
    char.char = startWord[i];
  }

  return {chars: chars, fixedAcross: fixedAcross, fixedIndex: fixedIndex, startWord: startWord};
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
  let thisState = state;
  newAdvance = advance;

  if (thisState.select == "across") {
    nextSpace["activeCol"] = (thisState.activeSpace + advance).mod(5);
    nextSpace["activeSpace"] = thisState.activeRow * 5 + nextSpace["activeCol"];
  } else {
    nextSpace["activeRow"] = (thisState.activeRow + advance).mod(5);
    nextSpace["activeSpace"] = nextSpace.activeRow * 5 + thisState["activeCol"];
  }
  if (thisState.chars[nextSpace.activeSpace].fixed == true && ((thisState.fixedAcross == true && thisState.select != 'across')||(thisState.fixedAcross == false && thisState.select != 'down') ) ) {
    thisState.activeRow = nextSpace.activeRow;
    thisState.activeCol = nextSpace.activeCol;
    thisState.activeSpace = nextSpace.activeSpace;
    return getNextSpace(thisState, newAdvance, nextSpace);
  } else {
    return nextSpace;
  }
}

function checkWords(state, chars) {
  // TODO: If down ins selected, and space 23 (second to last), is filled to complete across word, it doesn't color.

  let acrossWords = state.acrossWords;
  let downWords = state.downWords;

  // Populate words with chars
  for (let i = 0; i < 5; i++) {
    let validAcross = false;
    let validDown = false;
    let across = {word: "", index: new Array(5)};
    let down = {word: "", index: new Array(5)};
    for (let j = 0; j < 5; j++){
      across.word = across.word + chars[(i * 5 + j)].char;
      across.index[j] = i * 5 + j
      down.word = down.word + chars[(j * 5 + i)].char;
      down.index[j] = j * 5 + i
    }
    validAcross = across.length < 5 || !dict[across.word.toLowerCase()] ? false : true;
    validDown = down.length < 5 || !dict[down.word.toLowerCase()] ? false : true;
    
    acrossWords[i] = validAcross
    downWords[i] = validDown
    if(validAcross == true){
      for(let index of across.index){
        chars[index].across = true
      }
    }
    else{
      for(let index of across.index){
        chars[index].across = false
      }
    }

    if(validDown == true){
      for(let index of down.index){
        chars[index].down = true
      }
    }
    else{
      for(let index of down.index){
        chars[index].down = false
      }
    }
    
  }

  return { chars: chars, downWords: downWords, acrossWords: acrossWords };
}

function scoreGame(state, endGame = true) {
  let totalScore = 0;
  let bonus = 100;
  let scoredChars = state.scoredChars;
  for (let i = 0; i < 5; i++ ){
    if(state.acrossWords[i] == true){
      if(state.fixedAcross == true && i == state.fixedIndex){
        totalScore += 15
      }
      else{
        totalScore += 25
      }
    }
  }
  for (let i = 0; i < 5; i++ ){
    if(state.downWords[i] == true){

      if(state.fixedAcross == false && i == state.fixedIndex){
        totalScore += 15
      }
      else{
        totalScore += 25
      }
    }
  }
  
  for (let i = 0; i < 25; i++) {
    let letterScore = 0;
    if (!state.chars[i].down == true || !state.chars[i].across == true) {
      bonus = 0;
    }
    if(state.chars[i].down == true || state.chars[i].across){
      letterScore = letter_values[state.chars[i].char]
    }
    
    scoredChars[i] = letterScore;
    totalScore += letterScore;
  }
  totalScore += bonus;

  return {
    totalScore: totalScore,
    gameOver: endGame,
    scoredChars: scoredChars,
    select: selectStates[2],
  };
}

export async function submitGame(state) {
  try {
    // Default options are marked with *
    const response = await fetch("https://api-oqlbag234q-uc.a.run.app/submitGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state), // Use "state" instead of "data"
    });

    console.log("response: ", JSON.stringify(response));

    if (!response.ok) {
      // If the response status is not OK (e.g., 4xx or 5xx status code)
      // You can throw an error or handle it accordingly
      throw new Error("Network response was not OK.");
    }

    // If the response is successful, parse the JSON response
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error("Error submitting the game:", error.message);
    throw error; // Re-throw the error to notify the caller about the error
  }
}

export async function getStats(startDate, additionalDays) {
  const endDate = additionalDays > 0 ? getEndDate(startDate, additionalDays) : null

  try {
    // Default options are marked with *
    const response = await fetch(`https://api-oqlbag234q-uc.a.run.app/stats?startdate=${startDate}${endDate ? "&"+endDate : ""}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state), // Use "state" instead of "data"
    });

    console.log("response: ", JSON.stringify(response));

    if (!response.ok) {
      // If the response status is not OK (e.g., 4xx or 5xx status code)
      // You can throw an error or handle it accordingly
      throw new Error("Network response was not OK.");
    }

    // If the response is successful, parse the JSON response
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error("Error submitting the game:", error.message);
    throw error; // Re-throw the error to notify the caller about the error
  }
}

function getEndDate(startDate, days) {
  const date = new Date(startDate);
  date.setDate(date.getDate() - days);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  
  return `${month}/${day}/${year}`;
}




// New method to correct for negative modulo
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};
