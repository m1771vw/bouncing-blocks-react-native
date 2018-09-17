import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";

import Systems from "./components/Systems";
import LevelOne from './components/Levels/level-1';

export default class App extends PureComponent {
  render() {
    return (
      <GameEngine 
        style={styles.container} 
        systems={Systems} // Array of Systems
        entities={LevelOne()}> {/*Returns Object of entities*/}
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
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