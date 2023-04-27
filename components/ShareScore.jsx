import React from "react";
import { Alert, Share, View, Button } from "react-native";
import { useAppState } from "../AppState";

const ShareScore = () => {
  const { state, dispatch } = useAppState();
  const getMessage = () => {
    let chars = state.chars;
    let msg = `Five by Five\n${state.today}\nScore: ${state.totalScore}\n`;
    for (let i = 0; i < 25; i++) {
      msg = msg + getSquare(chars[i]);
      if (i % 5 == 4) {
        msg = msg + "\n";
      }
    }
    return msg;
  };

  const getSquare = (char) => {
    if (char.across == true && char.down == true && char.fixed == true) {
      return "🟨";
    } else if (
      (char.across == true && char.fixed == true) ||
      (char.down == true && char.fixed == true) ||
      (char.down == true && char.across == true && char.fixed == false)
    ) {
      return "🟦";
    } else if (char.across == true || char.down == true) {
      return "🟩";
    } else {
      return "⬜";
    }
  };

  const onShare = async () => {
    for (let i = 0; i < 25; i++) {}
    try {
      const result = await Share.share({
        message: getMessage(),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default ShareScore;
