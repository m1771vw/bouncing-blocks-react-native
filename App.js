import React, { PureComponent } from "react";
import { Dimensions, View, StatusBar, Platform, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MainMenu from "./components/Menus/MainMenu";
import Game from "./game";


const defaultTheme = {
  $bouncyBoxMenuMaxWidth: 500,
  $bouncyBoxMenuFont: Platform.OS === "ios" ? "System" : "normal",
  $bouncyBoxMenuBackgroundColor: "#fffddd",
  $bouncyBoxMenuPrimaryColor: "#66f6cb",
  $bouncyBoxMenuSecondaryColor: "#9ef9de"//"#25D9D9"
};

export default class BouncyBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameVisible: false
    };
  }
  async componentWillMount() {
    await EStyleSheet.build(Object.assign({}, defaultTheme, this.props.theme));
  }

  onLayout(e) {
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    console.log('App.js: width: ', width, 'height: ', height)
  }

  toggleGame = gameVisible => {
    this.setState({
      gameVisible
    });
  };

  render() {
    return (
      <View style={styles.container} 
      onLayout={this.onLayout}
      >
        <StatusBar barStyle={"light-content"} hidden={this.state.gameVisible} animated showHideTransition={"slide"} />
        <MainMenu onPlayGame={_ => this.toggleGame(true)} />
        <Game
          visible={this.state.gameVisible}
          onClose={_ => this.toggleGame(false)}
        />
      </View>
    );
  }
}

// bouncyBox.defaultProps = {
//   theme: defaultTheme
// };

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
