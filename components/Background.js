import React, { Component, PureComponent } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";


export default class Box extends Component {
  render() {
    // const width = this.props.size[0];
    // const height = this.props.size[1];
    // const x = this.props.body.position.x - width / 2;
    // const y = this.props.body.position.y - height / 2;
    // const angle = this.props.body.angle;
    // Returns a View that is just a Box designed in CSS
    // Can customize this box w/ Props
    return (
        <ImageBackground style={{opacity: 0.4, flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center'}}
        // source={{uri:'https://png.pngtree.com/thumb_back/fw800/back_pic/03/57/04/33579fed2bb5808.jpg'}}>
        source={this.props.source}>
        </ImageBackground>
    );
  }
}

