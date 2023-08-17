import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Pressable,
	Alert,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { useAppState, submitGame, getStartDate } from "../AppState";
import Space from "./Space";
import Keyboard from "./Keyboard";
import WordCounter from "./WordCounter";
import ShareScore from "./ShareScore";

import { useHeaderHeight } from "@react-navigation/elements";

const GenerateLetters = () => {
	let letters = [];
	let index = 0;
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			const letter = { index: index, row: i, col: j };
			letters.push(letter);
			index += 1;
		}
	}
	return letters;
};

const windowHeight = Dimensions.get("window").height;

const Board = ({ navigation }) => {
	const { state, dispatch } = useAppState();
	const [focusState, setFocusState] = useState(AppState.currentState);

	const headerHeight = useHeaderHeight();
	const openInstructions = () => {
		navigation.navigate("Instructions");
	};
	const appStateListener = AppState.addEventListener(
		"change",
		(nextAppState) => {
			setFocusState(nextAppState);
		}
	);
	const clickFinish = () => {
		Alert.alert(
			"Are you sure?",
			"Finish and score your game.",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => handleFinishOK(),
				},
			],
			{ cancelable: true }
		);
	};

	const handleFinishOK = async () => {
		const currentState = state;
		dispatch({
			type: "scoreGame",
			payload: {},
		});

		try {
			await submitGame(currentState);
		} catch (error) {
			// Handle any errors that occur during submitGame
			console.error("Error submitting the game:", error);
			// You may want to show an error message to the user here
		}
		try {
			await getStats(currentState.today, 0);
		} catch (error) {
			console.error("Error getting stats:", error);
		}
	};

	const getStats = async (endDate, additionalDays) => {
		const startDate =
			additionalDays > 0 ? getStartDate(endDate, additionalDays) : endDate;

		try {
			// Default options are marked with *
			const response = await fetch(
				`https://api-oqlbag234q-uc.a.run.app/stats?startdate=${startDate}&enddate=${endDate}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("response: ", JSON.stringify(response));

			if (!response.ok) {
				// If the response status is not OK (e.g., 4xx or 5xx status code)
				// You can throw an error or handle it accordingly
				throw new Error("Network response was not OK.");
			}
			const statsData = await response.json(); // Read and parse JSON response
			console.log("statsData: ", statsData);

			dispatch({
				type: "showstats",
				payload: statsData,
			});
			// If the response is successful, parse the JSON response
			return response; // parses JSON response into native JavaScript objects
		} catch (error) {
			// Handle any errors that occur during the fetch request
			console.error("Error submitting the game:", error.message);
			throw error; // Re-throw the error to notify the caller about the error
		}
	};

	///////////// RENDER ////////////
	const renderSpace = ({ item }) => (
		<Space
			key={item.index}
			index={item.index}
			row={item.row}
			col={item.col}
			type={item.type}
		/>
	);

	const ColumnHeader = () => (
		<View style={styles.flexRowBetween}>
			<Text style={{ fontWeight: "bold" }}>Rank</Text>

			<Text style={{ fontWeight: "bold" }}>Score</Text>
			<Text style={{ fontWeight: "bold" }}>&#x1D453;</Text>
		</View>
	);

	const DayStat = (item) => {
		console.log("item: ", item);
		const backgroundColor =
			state.totalScore == item.item[0]
				? styles.bgLightGreen
				: item.index % 2 == 0
				? styles.aliceBlue
				: styles.bgWhite;
		return (
			<View style={[styles.flexRowBetween, backgroundColor]}>
				<Text style={styles.scoreText}>{item.index + 1}</Text>
				<Text style={styles.scoreText}>{item.item[0]}</Text>
				<Text style={styles.scoreText}>{item.item[1]}</Text>
			</View>
		);
	};

	const renderStats = () => {
		console.log(state.stats);
		if (state.stats.length == 0) {
			return <Text>Stats Unavailable</Text>;
		}

		return (
			<View style={styles.leaderboardContainer}>
				<Text
					style={[styles.flexRowBetween, { fontSize: 24, textAlign: "center" }]}
				>
					Leaderboard
				</Text>
				<FlatList
					key={state.stats[0]} // Don't forget to add a unique key
					ListHeaderComponent={ColumnHeader}
					data={state.stats[0]["scores"]} // Assuming "scores" is the array you want to render in FlatList
					renderItem={DayStat}
					numColumns={5}
				/>
			</View>
		);
	};
	const loadState = async () => {
		const jsonValue = await AsyncStorage.getItem("state");
		const savedState = JSON.parse(jsonValue);
		const tempToday = new Date().toLocaleDateString().slice(0, 11);
		if (
			jsonValue != null &&
			savedState.today &&
			savedState.today == tempToday
		) {
			dispatch({
				type: "load",
				payload: savedState,
			});
		} else {
			dispatch({
				type: "newgame",
			});
		}
	};
	useEffect(() => {
		const getLoad = async () => {
			await loadState();
		};
		getLoad();
		const appStateListener = AppState.addEventListener(
			"change",
			(nextAppState) => {
				setFocusState(nextAppState);
				if (nextAppState == "active") {
					getLoad();
				}
			}
		);

		return () => {
			appStateListener.remove(); // Remove the event listener when unmounting
		};
	}, []);
	useEffect(() => {
		const getLoad = async () => {
			await loadState();
		};
		getLoad();
	}, []);
	return (
		<View
			style={[styles.container, { height: windowHeight - useHeaderHeight() }]}
		>
			<View style={styles.section}>
				<WordCounter style={styles.counter} gameOver={state.gameOver} />

				<FlatList
					style={styles.flatList}
					data={GenerateLetters()}
					renderItem={renderSpace}
					numColumns={5}
					scrollEnabled={false}
				/>
			</View>
			<View style={styles.section}>
				{state.gameOver == false ? <Keyboard /> : null}

				{state.gameOver == false ? (
					<Pressable style={styles.button} onPress={clickFinish}>
						<Text maxFontSizeMultiplier={1.5} style={styles.btnText}>
							Finished
						</Text>
					</Pressable>
				) : (
					<>
						{/* <Pressable onPress={() => { getStats(state.today, 0) }}>
              <Text>Refresh stats</Text>
            </Pressable> */}
						<Text style={styles.score}>
							Final Score: <Text style={styles.gold}>{state.totalScore}</Text>
						</Text>

						{/* {renderStats()} */}
						<Text>Tap board for score details.</Text>
						<ShareScore />
					</>
				)}
			</View>
			<TouchableOpacity
				style={styles.instructions}
				onPress={() => openInstructions()}
			>
				<Text style={styles.iconText}>?</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		backgroundColor: "white",
	},
	flatList: {
		flexGrow: 0,
	},
	section: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginBottom: 24,
	},
	button: {
		marginTop: 8,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 10,
		elevation: 3,
		backgroundColor: "black",
		width: 180,
	},
	btnText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	score: {
		marginTop: 16,
		fontSize: 28,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "black",
	},
	gold: {
		color: "#e0b14a",
	},
	instructions: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: "black",
		borderWidth: 2,
		position: "absolute",
		right: 15,
		bottom: 15,
	},
	iconText: {
		fontSize: 20,
		textAlign: "center",
		textAlignVertical: "center",
	},
	leaderboardContainer: {
		width: "90%",
		borderColor: "black",
		borderWidth: 3,
		borderRadius: 5,
	},
	flexRowBetween: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	aliceBlue: {
		backgroundColor: "aliceblue",
	},
	bgWhite: {
		backgroundColor: "white",
	},
	bgLightGreen: {
		backgroundColor: "lightgreen",
	},
	scoreText: {
		fontSize: 20,
		textAlign: "center",
	},
});

export default Board;
