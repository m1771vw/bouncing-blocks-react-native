import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./Button";

export default class Popup extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Animatable.View
				useNativeDriver
				// style={styles.container}
				animation="bounceInUp"
			>
				{/* <ScrollView
					ref={"scrollView"}
					// onContentSizeChange={_ => {
					// 	this.refs.scrollView.scrollToEnd({
					// 		animated: true
					// 	});
					// }}
					// onLayout={({ nativeEvent: { layout: { height } } }) =>
					// 	this.setState({
					// 		scrollViewHeight: height
					// 	})}
					// contentContainerStyle={[
					// 	styles.scrollViewContainer,
					// 	{
					// 		minHeight: this.state.scrollViewHeight
					// 	}
					// ]}
				>
					{this.props.children}
				</ScrollView> */}
				<View>{this.props.children}</View>
				<Button
					onPress={this.props.onPlayAgain}
					style={styles.playGameButton}
				>
					Play Again
				</Button>
				<Button onPress={this.props.nextLevel} style={styles.cancelButton}>
					Next Level
				</Button>
				<Button onPress={this.props.onQuit} style={styles.cancelButton}>
					Quit
				</Button>
			</Animatable.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
		padding: 0,
		flex: 1,
		backgroundColor: 'transparent'
	},
	scrollViewContainer: {
		width: 200,
		alignSelf: "center",
		justifyContent: "center"
	},
	playGameButton: {
		maxWidth: 200,
		alignSelf: "center",
		marginBottom: 0
	},
	cancelButton: {
		maxWidth: 200,
		alignSelf: "center",
		marginBottom: 10,
		backgroundColor: "#ff4136"
	}
});
