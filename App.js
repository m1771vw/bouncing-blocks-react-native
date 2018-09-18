import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Systems from "./components/Systems";
import LevelOne from './components/Levels/level-1';

export default class App extends PureComponent {
  state={
    score: 0,
    trampolines: 15,
    lives: 5
  }
  increaseScore = () => {
    // console.log("Trying to increase score")
    this.setState({
      score: this.state.score + 1
    });
  }
  increaseTrampolines = () => {
    this.setState({
      trampolines: this.state.trampolines + 1
    })
  }
  decreaseTrampolines = () => {
    this.setState({
      trampolines: this.state.trampolines - 1
    })
  }
  decreaseLives = () => {
    this.setState({
      lives: this.state.lives - 1
    })
  }
  handleEvent = ev => {
    switch (ev.type) {
      case "increase-trampolines":
        this.increaseTrampolines();
        break;
      case "increase-score":
      // console.log("Trying to increase score")
        this.increaseScore();
        break;
      case "decrease-trampolines":
        this.decreaseTrampolines();
        break;
      case "decrease-lives":
        this.decreaseLives();
        break;
    }
  };
  render() {
    return (
      <GameEngine 
        onEvent={this.handleEvent}
        style={styles.container} 
        systems={Systems} // Array of Systems
        entities={LevelOne()}> {/*Returns Object of entities*/}
        <StatusBar hidden={true} />
        <View style={styles.scoreContainer}>
        <Text>Score: {this.state.score}</Text>
        <Text>Lives: {this.state.lives}</Text>
        <Text>Trampoline: {this.state.trampolines}</Text>
        </View>
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  scoreContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    margin: 5

  }
});

AppRegistry.registerComponent("App", () => App);


/** from <GameEngine/> Will cycle through each entity and apply system?
 * Takes in array of systems
 * arr.reduce(callback[, initialValue])
 * const reducer = (accumulator, currentValue) => accumulator + currentValue;
 *
 *     let newState = this.props.systems.reduce(
      (state, sys) => sys(state, args), this.state.entities
    );
 */

 /**
  * From MDN:
  * // 5 + 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer, 5));
    // expected output: 15
  */