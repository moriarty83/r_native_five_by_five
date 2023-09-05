import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, ActivityIndicator } from "react-native";
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
	const [loadingStats, setLoadingStats] = useState(false);

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
		setLoadingStats(true);
		const startDate =
			additionalDays > 0 ? getStartDate(endDate, additionalDays) : endDate;

		try {
			console.log("trying");
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

			if (!response.ok) {
				// If the response status is not OK (e.g., 4xx or 5xx status code)
				// You can throw an error or handle it accordingly
				setLoadingStats(false);

				throw new Error("Network response was not OK.");
			}
			const statsData = await response.json(); // Read and parse JSON response
			console.log("statsData: ", statsData);

			dispatch({
				type: "showstats",
				payload: statsData,
			});
			// If the response is successful, parse the JSON response
			setLoadingStats(false);
			return response; // parses JSON response into native JavaScript objects
		} catch (error) {
			// Handle any errors that occur during the fetch request
			console.error("Error submitting the game:", error.message);
			dispatch({
				type: "showstats",
				payload: null,
			});
			setLoadingStats(false);
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
			<Text style={{ fontWeight: "bold", textAlign: "left", width: 50 }}>
				Rank
			</Text>

			<Text style={{ fontWeight: "bold", textAlign: "center", width: 60 }}>
				Score
			</Text>
			<Text style={{ fontWeight: "bold", textAlign: "right", width: 50 }}>
				&#x1D453;
			</Text>
		</View>
	);

	const DayStat = (item) => {
		const [score, frequency] = item.item;

		const backgroundColor =
			state.totalScore == item.item[0]
				? styles.bgLightGreen
				: item.index % 2 == 0
				? styles.aliceBlue
				: styles.bgWhite;
		return (
			<View
				key={`${item.index}-stat`}
				style={[styles.flexRowBetween, backgroundColor]}
			>
				<Text style={styles.scoreText}>{item.index + 1}</Text>
				<Text style={styles.scoreText}>{score}</Text>
				<Text style={styles.scoreText}>{frequency}</Text>
			</View>
		);
	};

	const renderStats = () => {
		console.log("state.stats: ", state.stats);

		return (
			<View style={styles.leaderboardContainer}>
				<Text
					style={[styles.flexRowBetween, { fontSize: 24, textAlign: "center" }]}
				>
					Leaderboard
				</Text>
				{loadingStats && <ActivityIndicator />}
				{!loadingStats && !state.stats && (
					<Text style={(textAlign = "center")}>Stats Unavailable</Text>
				)}
				{!loadingStats && state.stats && state.stats.length > 0 && (
					<FlatList
						ListHeaderComponent={ColumnHeader}
						data={state.stats[0]["scores"]} // Assuming "scores" is the array you want to render in FlatList
						renderItem={DayStat}
						numColumns={1}
					/>
				)}
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
		if (state.gameOver == true) {
			getStats(state.today, 0);
		}
	}, [state.gameOver]);
	return (
		<View
			style={[
				styles.container,
				styles.margin_b_24,
				styles.padding_b_24,
				{ height: windowHeight - useHeaderHeight() },
			]}
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
					<View id='stats-view' style={styles.section}>
						<Pressable
							onPress={() => {
								getStats(state.today, 0);
							}}
						>
							{loadingStats == false && <Text>Refresh</Text>}
						</Pressable>
						{/* <Text style={styles.score}>
							Final Score: <Text style={styles.gold}>{state.totalScore}</Text>
						</Text> */}

						{renderStats()}
						<Text>Tap board for score details.</Text>
					</View>
				)}
			</View>
			{state.gameOver == true ? (
				<ShareScore style={styles.margin_b_24} />
			) : null}
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
	},
	margin_b_24: {
		marginBottom: 24,
	},
	padding_b_24: {
		paddingBottom: 24,
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
		maxHeight: "80%",
		padding: 2,
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
