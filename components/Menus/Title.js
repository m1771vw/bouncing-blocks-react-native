import React, { PureComponent } from "react";
import { Text, View, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import Popup from '../Popup';
import Button from '../Button';
const {width, height} = Dimensions.get('screen')
export default class Title extends PureComponent {
//   componentDidUpdate(prevProps){
//     if(prevProps.titleVisible !== this.prependOnceListener.titleVisible) {

//     }
    
//   }
    // state = {
    //     titleVisible: true
    // }
    // onPlayGame = () => {
    //     this.setState({titleVisible: false})
    // }
  render() {
    return (
        <Animatable.View
        useNativeDriver
        style={styles.titleContainer}
        animation={this.props.titleVisible ?  undefined:'fadeOut'}
        // animation={this.props.titleVisible ? 'fadeOut' : undefined}
        onAnimationEnd={this.props.startGame}
    >
        <Text style={styles.titleH1}>Bouncy</Text>
        <Text style={styles.titleH2}>Box</Text>
        <Button onPress={this.props.onPlayGame}>Play Game</Button>
        </Animatable.View>

    );
  }
}

const styles = EStyleSheet.create({
  titleContainer: {
    // marginTop: 90,
    paddingTop: 90,
    marginBottom: 60,
    alignItems: "center",
    borderWidth: 1,
    minWidth: width,
    minHeight: height,
    backgroundColor: 'white'
  },
  titleH1: {
    fontSize: 60,
    color: "$bouncyBoxMenuPrimaryColor",
    textShadowColor: "$bouncyBoxMenuSecondaryColor",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 0,
    fontFamily: "$bouncyBoxMenuFont"
  },
  titleH2: {
    fontSize: 40,
    color: "$bouncyBoxMenuPrimaryColor",
    textShadowColor: "$bouncyBoxMenuSecondaryColor",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 0,
    fontFamily: "$bouncyBoxMenuFont"
  },
  titleH3: {
    fontSize: 15,
    color: "#FFF",
    fontFamily: "$bouncyBoxMenuFont"
  }
});
