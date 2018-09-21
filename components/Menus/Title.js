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
      console.log('trying to render title')
    return (

        <Animatable.View
        useNativeDriver
        style={styles.titleContainer}
        animation={this.props.titleVisible ?  undefined:'fadeOut'}
        // animation={this.props.titleVisible ? 'fadeOut' : undefined}
        onAnimationEnd={this.props.startGame}
    >
    {/* // <View style={styles.titleContainer}> */}
        <ImageBackground style={{opacity: 0.4, flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center'}}
        source={{uri:'https://png.pngtree.com/thumb_back/fw800/back_pic/03/57/04/33579fed2bb5808.jpg'}}>

        </ImageBackground>
        <Text style={styles.titleH1}>Bouncy Blocks</Text>
        {/* <Text style={styles.titleH2}></Text> */}
        <Button style={styles.buttonTitle} onPress={this.props.onPlayGame}>Play Game</Button>
        {/* <Animatable.View
            animation='fadeOut'
            useNativeDriver
            style={styles.box}>

        </Animatable.View> */}
    {/* </View> */}
         </Animatable.View> 

    );
  }
}

const styles = EStyleSheet.create({
  titleContainer: {
    // marginTop: 90,
    // paddingTop: 90,
    // marginBottom: 60,
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
    fontSize: 40,
    alignSelf: 'center',
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
  }, 
  buttonTitle: {
      width: 200,
      alignSelf: 'center'
  },
  box: {
    position: "absolute",
    // left: 100,
    // top: 100,
    width: 200,
    height: 200,
    borderColor: 'black',
    backgroundColor: 'black'
  }
});
