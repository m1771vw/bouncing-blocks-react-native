import React, { PureComponent } from "react";
import { Dimensions, AppRegistry, StyleSheet, StatusBar, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Systems from "./components/Systems";
import LevelOne from './components/Levels/level-1';
import GameOver from './components/GameOver';

const startingLives = 2
export default class App extends PureComponent {
  state={
    score: 0,
    trampolines: 15,
    lives: startingLives,
    gameIsRunning: true,
    gameOver: false
  }
  onLayout(e) {
    const {width, height} = Dimensions.get('screen')
    console.log(width, height)
  }
  restart = () => {
    this.refs.engine.swap(LevelOne());
    this.setState({
      gameIsRunning: true,
      gameOver: false,
      lives: startingLives + 1
    });
  };
  quit = () => {
    this.setState({
      running: false,
      gameOver: false,
      // princessRescued: false
    });

    // if (this.props.onClose) this.props.onClose();
  };
  gameOver = () => {
    this.setState({
      gameIsRunning: false
    })
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
    }, this.checkIfGameOver)
  }
  checkIfGameOver = () => {
    this.state.lives <= 0 
    ? this.setState({
      gameOver: true,
      gameIsRunning: false
    })
    : this.setState({
      gameIsRunning: true
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
      case "game-over":
        this.gameOver();
        break;
    }
  };
  render() {
    return (
      <GameEngine 
        ref={'engine'}
        onEvent={this.handleEvent}
        running={this.state.gameIsRunning}
        style={styles.container} 
        systems={Systems} // Array of Systems
        entities={LevelOne()}> {/*Returns Object of entities*/}
        <StatusBar hidden={true} />
        <View onLayout={this.onLayout.bind(this)} style={styles.scoreContainer}>
        <Text>Score: {this.state.score}</Text>
        <Text>Lives: {this.state.lives}</Text>
        <Text>Trampoline: {this.state.trampolines}</Text>
        </View>
        <View>
          
        {this.state.gameOver && (
            /* <Text> Game over </Text> */
            <GameOver onPlayAgain={this.restart} onQuit={this.quit} />
          )}
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