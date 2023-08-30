import React from "react";
import { Alert, Share, View, Button } from "react-native";
import { useAppState } from "../AppState";
import { fetchStartWord } from "../AppState";

const ShareScore = () => {
	const { state, dispatch } = useAppState();
	const getMessage = () => {
		let chars = state.scoredChars;
		let msg = `Crosswordify\n${state.today}: ${fetchStartWord()}\nScore: ${
			state.totalScore
		}\n`;
		for (let i = 0; i < 25; i++) {
			msg = msg + getSquare(chars[i]);
			if (i % 5 == 4) {
				msg = msg + "\n";
			}
		}
		return msg;
	};
	//🟧

	const getSquare = (char) => {
		if (char == 1) {
			return "🟨";
		} else if (char == 2) {
			return "🟩";
		} else if (char == 3) {
			return "🟦";
		} else if (char == 4) {
			return "🟪";
		} else if (char == 5) {
			return "🟧";
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
		<View>
			<Button onPress={onShare} title='Share' />
		</View>
	);
};

export default ShareScore;
