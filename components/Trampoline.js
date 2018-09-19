import React, { Component, PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { array, object, string } from 'prop-types';
/**
 * Props: 
 *  - size: []
 *  - body { position(x,y) } - Position comes from Rectangle Object
 *  - angle 
 *  - color 
 */
export default class Trampoline extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const angle = this.props.body.angle;
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
            transform: [{ rotate: angle + "rad" }],
            backgroundColor: this.props.color || "#4441f4",
            borderColor: 'black',
            borderWidth: 1

          }}/>
    );
  }
}

Trampoline.propTypes = {
    size: array,
    body: object, 
    // angle: ,
    color: string
}

/**
 * Props: 
 *  - size: []
 *  - body { position(x,y) } 
 *  - angle 
 *  - color 
 */