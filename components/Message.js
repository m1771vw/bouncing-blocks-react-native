import React, { PureComponent } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import TypeWriter from "react-native-typewriter";

export default class Message extends PureComponent {
	render() {
		return (
			<Animatable.View
				useNativeDriver
				style={styles.message}
				animation={this.props.animation}
			>
				<Image style={styles.image} source={this.props.image} />
				{this.props.children && (
					<View style={styles.textContainer}>
						<TypeWriter
							style={styles.text}
							typing={1}
							maxDelay={50}
							onTyped={this.props.onTyped}
							onTypingEnd={this.props.onTypingEnd}
						>
							{this.props.children}
						</TypeWriter>
					</View>
				)}
			</Animatable.View>
		);
	}
}

const styles = StyleSheet.create({
	message: {
		marginTop: 4,
		// borderWidth: 1,
		// borderColor: 'red'
		
	},
	image: {
		alignSelf: "center"
	},
	textContainer: {
		// backgroundColor: "#FFF",
		padding: 1,
		// borderRadius: 11,
		marginLeft: 30,
		marginRight: 30,
		minHeight: 40
	},
	text: {
		// fontFamily: "$bouncyBoxMenuFont",
		fontFamily: "Futura-CondensedExtraBold",
		fontSize: 30
	}
});
