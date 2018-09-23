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

export default class TitleButton extends PureComponent {

  render() {
      // console.log('trying to render button')
    return (

    <View style={styles.titleContainer}>
        <Button style={styles.buttonTitle} onPress={this.props.onPlayGame}>Play Game</Button>
    </View> 

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
    backgroundColor: 'grey'
  },

  buttonTitle: {
      width: 200,
    //   position: 'absolute',
    //   height: 500,
      backgroundColor: 'white',
      alignSelf: 'center',
      marginTop: 50,
      marginLeft: 100
  },
  box: {
    position: "absolute",
    // left: 100,
    // top: 100,
    width: 200,
    height: 200,
    // borderColor: 'black',
    // backgroundColor: 'black'
  }
});
