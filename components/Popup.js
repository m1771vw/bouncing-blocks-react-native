import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./Button";
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Popup extends PureComponent {
	constructor(props) {
		super(props);			
		this.state = {};
	}

	render() {
		return (

			<Animatable.View
			useNativeDriver
			style={styles.container}
			animation="bounceInUp"
		>
				<View>{this.props.children}</View>
				<View style={styles.buttonContainer}> 

				<Button
					onPress={this.props.onPlayAgain}
					style={styles.playGameButton}
				>
					{/* Play Again */}
					<FontAwesome style={{color:'white'}}>{Icons.repeat}</FontAwesome>
				</Button>
				<Button onPress={this.props.nextLevel} style={styles.nextButton}>
					{/* Next Level */}
					<FontAwesome style={{color:'white'}}>{Icons.angleDoubleRight}</FontAwesome>
				</Button>
				<Button onPress={this.props.onQuit} style={styles.cancelButton}>
					{/* Quit */}
					<FontAwesome style={{color:'white'}}>{Icons.times}</FontAwesome>
				</Button>
				</View>
			</Animatable.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
		padding: 0,
		// flex: 1,
		backgroundColor: 'white',
		borderColor:'grey',
		borderWidth: 1,
		borderRadius: 5,
		// borderColor: 'blue',
		// borderWidth: 4,
		padding: 50,
		minWidth: 390
	},
	buttonContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center',
		maxWidth: 200,
		// borderColor:'red',
		// borderWidth: 4,

	},
	scrollViewContainer: {
		width: 200,
		alignSelf: "center",
		justifyContent: "center"
	},
	playGameButton: {
		maxWidth: 50,
		alignSelf: "center",
		backgroundColor: '#41d0f4'
		// marginBottom: 0
	},
	cancelButton: {
		maxWidth: 50,
		alignSelf: "center",
		// marginBottom: 0,
		backgroundColor: "#ff4136"
	},
	nextButton: {
		maxWidth: 50,
		alignSelf: 'center',
		backgroundColor: '#86E9BE'
	}
});
