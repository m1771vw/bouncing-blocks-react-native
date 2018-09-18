import React, { Component, PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { array, object, string } from 'prop-types';

export default class TrampolineScore extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.position.x - width / 2;
    const y = this.props.position.y - height / 2;

    // Returns a View that is just a Box designed in CSS
    // Can customize this box w/ Props
    return (
      <View
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            // transform: [{ rotate: angle + "rad" }],
            // backgroundColor: this.props.color || "#4441f4"
          }}>
              <Text>Trampolines Left: 15</Text>
          </View>
    );
  }
}