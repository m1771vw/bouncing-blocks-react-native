import React, { Component, PureComponent } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";


export default class Box extends Component {
  render() {
    return (
        <ImageBackground style={{opacity: 0.4, flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center'}}
        source={this.props.source}>
        </ImageBackground>
    );
  }
}

