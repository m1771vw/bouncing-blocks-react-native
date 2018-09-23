import React, { PureComponent } from "react";
import { Text, View, Dimensions, ImageBackground } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import Popup from '../Popup';
import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';
import GameEngine from 'react-native-game-engine';
import Systems from '../Systems/';
import LevelOne from '../Levels/level-1';

const {width, height} = Dimensions.get('screen');

export default class Title extends PureComponent {
    state={
        titleIsRunning: true
    }

  render() {
    return (
        <Animatable.View
          useNativeDriver
          style={styles.titleContainer}
          animation={this.props.titleVisible ?  undefined:'fadeOut'}
          onAnimationEnd={this.props.startGame}
        >
          <ImageBackground style={{opacity: 0.4, flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center'}}
                           source={require('../assets/img/green_gradient_reversed.png')}>
          </ImageBackground>
            <Text style={styles.titleH1}>Bouncing Blocks</Text>
            <Text style={styles.titleH2}>Press on the screen to make trampolines</Text>
            <Text style={styles.titleH2}>Bounce blocks to the other side and don't let them fall!</Text>
            <Button style={styles.buttonTitle} onPress={this.props.onPlayGame}>Play Game</Button>
         </Animatable.View> 
    );
  }
}

const styles = EStyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: width,
    minHeight: height,
    backgroundColor: 'transparent'
  },
  titleH1: {
    fontSize: 60,
    alignSelf: 'center',
    color: "$bouncyBoxMenuPrimaryColor",
    textShadowColor: "$bouncyBoxMenuSecondaryColor",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 0,
    fontFamily: "$bouncyBoxMenuFont",
    marginTop: 140
  },
  titleH2: {
    fontSize: 16,
    alignSelf: 'center',
    color: "black",
    textShadowRadius: 0,
    fontFamily: "$bouncyBoxMenuFont"
  },
  buttonTitle: {
      width: 200,
      alignSelf: 'center'
  }
});
