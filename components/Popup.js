import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./Button";
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Popup extends PureComponent {
	render() {
		return (
			<Animatable.View
				useNativeDriver
				style={styles.container}
				animation="bounceInUp"
			>
				<View>{this.props.children}</View>
					<View style={styles.buttonContainer}> 
						<Button onPress={this.props.onPlayAgain} style={styles.playGameButton}>
							<FontAwesome style={{color:'white'}}>{Icons.repeat}</FontAwesome>
						</Button>
						<Button onPress={this.props.nextLevel} style={styles.nextButton}>
							<FontAwesome style={{color:'white'}}>{Icons.angleDoubleRight}</FontAwesome>
						</Button>
					<Button onPress={this.props.onQuit} style={styles.cancelButton}>
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
		backgroundColor: 'white',
		borderColor:'grey',
		borderWidth: 1,
		borderRadius: 5,
		padding: 50,
		minWidth: 390
	},
	buttonContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center',
		maxWidth: 200,
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
	},
	cancelButton: {
		maxWidth: 50,
		alignSelf: "center",
		backgroundColor: "#ff4136"
	},
	nextButton: {
		maxWidth: 50,
		alignSelf: 'center',
		backgroundColor: '#86E9BE'
	}
});
