import React, { PureComponent } from "react";
import { View, Dimensions, ImageBackground } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Popup from '../Popup';
import Button from '../Button';


const {width, height} = Dimensions.get('screen');

export default class TitleButton extends PureComponent {

  render() {
    return (
    <View style={styles.titleContainer}>
        <Button style={styles.buttonTitle} onPress={this.props.onPlayGame}>Play Game</Button>
    </View> 
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
    backgroundColor: 'grey'
  },
  buttonTitle: {
      width: 200,
      backgroundColor: 'white',
      alignSelf: 'center',
      marginTop: 50,
      marginLeft: 100
  }
});
