import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

export default class Box extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const angle = this.props.body.angle;
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
            borderWidth: 1,
            borderRadius: 5,
            borderColor: this.props.borderColor || 'white'
          }}/>
    );
  }
}

Box.propTypes = {
    size: array,
    body: object, 
    color: string
}

