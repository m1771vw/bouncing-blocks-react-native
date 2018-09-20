import React, { PureComponent } from "react";
import { Dimensions, AppRegistry, StyleSheet, StatusBar, Text, View, Platform, Modal } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Systems from "./components/Systems";
import LevelOne from './components/Levels/level-1';
import LevelTwo from './components/Levels/level-2';
import LevelThree from './components/Levels/level-3';
import GameOver from './components/GameOver';
import NextLevel from './components/NextLevel';
import EStyleSheet from "react-native-extended-stylesheet";

const STARTINGLIVES = 100
const STARTINGTRAMPOLINES = 20
const BOXREMOVELIMIT = 1
// const defaultTheme = {
//   $bouncyBoxMenuMaxWidth: 500,
//   $bouncyBoxMenuFont: Platform.OS === "ios" ? "System" : "normal",
//   $bouncyBoxMenuBackgroundColor: "black",
//   $bouncyBoxMenuPrimaryColor: "#2068E3",
//   $bouncyBoxMenuSecondaryColor: "#00FFFF"//"#25D9D9"
// };
export default class App extends PureComponent {
  state={
    score: 0,
    removedBoxes: 0,
    trampolines: STARTINGTRAMPOLINES,
    lives: STARTINGLIVES,
    gameIsRunning: false,
    gameOver: false,
    levelBeat: false,
    currentLevel: 'level-1'
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        gameIsRunning: true
      });
    }
  }
  onLayout(e) {
    const {width, height} = Dimensions.get('screen')
    console.log('width: ', width, 'height: ', height)
  }
  nextLevel = () => {
    console.log("Trying to go to next level")
    this.turnOffText();
    switch(this.state.currentLevel) {
      case 'level-1':
      this.refs.engine.swap(LevelTwo());
      setTimeout(() => {
        this.resetState('level-2');
      }, 1000);
      // this.resetState('level-2')
        break;
      case 'level-2':
      this.refs.engine.swap(LevelThree());
      setTimeout(() => {
        this.resetState('level-3');
      }, 1000);
      // this.resetState('level-3')
      break;
      case 'level-3':
      this.refs.engine.swap(LevelOne());
      setTimeout(() => {
        this.resetState('level-1');
      }, 1000);
      // this.resetState('level-1')
      break;
    }
    
  }
  turnOffText = () => {
    this.setState({
      gameOver: false,
      levelBeat: false
    })
  }
  resetState = (level) => {
    this.setState({
      currentLevel: level, 
      gameIsRunning: true,
      gameOver: false,
      levelBeat: false, 
      trampolines: STARTINGTRAMPOLINES, 
      lives: STARTINGLIVES,
      removedBoxes: 0
      })
  }
  getLevelFromState = () => {
    switch(this.state.currentLevel){
      case 'level-1':
        return LevelOne()
      case 'level-2':
        return LevelTwo()
      case 'level-3':
        return LevelThree()
    }
  }
  restart = () => {
    this.refs.engine.swap(this.getLevelFromState())
    this.turnOffText();
    setTimeout(() => {
      this.resetState(this.state.currentLevel);
    }, 1000);
    // this.setState({
    //   gameIsRunning: true,
    //   gameOver: false,
    //   lives: STARTINGLIVES + 1,
    //   trampolines: STARTINGTRAMPOLINES,
    //   removedBoxes: 0,
    //   currentLevel: 'level-1'
    // }, () => {this.refs.engine.swap(LevelOne())});

  };
  quit = () => {
    this.setState({
      gameIsRunning: false,
      gameOver: false,
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
  levelBeat = () => {
    this.setState({
      levelBeat: true,
      gameIsRunning: false
    })
  }
  removeBox = () => {
    this.setState({
      removedBoxes: this.state.removedBoxes + 1
    }, this.checkIfGameOver)
  }
  checkIfGameOver = () => {
    this.state.lives !== 0 && this.state.removedBoxes === BOXREMOVELIMIT
    ? this.setState({
      levelBeat: true,
      gameIsRunning: false
    }): this.state.lives <= 0 || this.state.removedBoxes === BOXREMOVELIMIT
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
      case "level-beat":
        this.levelBeat();
        break;
      case "remove-box":
        this.removeBox();
        break;
    }
  };

  render() {
    let {container, scoreFont, scoreContainer, endMessage} = styles
    let {gameIsRunning, score, lives, trampolines} = this.state
    return (
      <Modal
        transparent={false}
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.quit}>
      <GameEngine 
        ref={'engine'}
        onEvent={this.handleEvent}
        running={gameIsRunning}
        style={styles.container} 
        systems={Systems} // Array of Systems
        entities={LevelOne()}> {/*Returns Object of entities*/}
        <StatusBar hidden={true} />
        {/* <View onLayout={this.onLayout.bind(this)} style={scoreContainer}> */}
        <View style={scoreContainer}>
          <Text style={scoreFont}>Score: {score}</Text>
          <Text style={scoreFont}>Lives: {lives}</Text>
          {/* <Text>State: {gameIsRunning && 'Running'}</Text> */}
          {/* <Text>Level Beat: {(!levelBeat) && 'Not Beaten'}</Text> */}
          <Text style={scoreFont}>Trampolines Left: {trampolines}</Text>
          {/* <Text>Removed: {removedBoxes}</Text> */}
        </View>
        <View style={endMessage}>
        {this.state.gameOver && (
            /* <Text> Game over </Text> */
            <GameOver onPlayAgain={this.restart} nextLevel={this.nextLevel}  onQuit={this.quit} />
          )}
          {
            this.state.levelBeat && (
              <NextLevel onPlayAgain={this.restart} nextLevel={this.nextLevel}  onQuit={this.quit}/>
            )
          }
        </View>
      </GameEngine>
      </Modal>
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
    margin: 25
  },
  scoreFont: {
    fontSize: 18
  },
  endMessage: {
    alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey'
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