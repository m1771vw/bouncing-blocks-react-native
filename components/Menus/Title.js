import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default class Title extends PureComponent {
  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleH1}>Bouncy</Text>
        <Text style={styles.titleH2}>Box</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  titleContainer: {
    marginTop: 90,
    marginBottom: 60,
    alignItems: "center"
  },
  titleH1: {
    fontSize: 60,
    color: "$bouncyBoxMenuPrimaryColor",
    textShadowColor: "$bouncyBoxMenuSecondaryColor",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 0,
    fontFamily: "$bouncyBoxMenuFont"
  },
  titleH2: {
    fontSize: 40,
    color: "$bouncyBoxMenuPrimaryColor",
    textShadowColor: "$bouncyBoxMenuSecondaryColor",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 0,
    fontFamily: "$bouncyBoxMenuFont"
  },
  titleH3: {
    fontSize: 15,
    color: "#FFF",
    fontFamily: "$bouncyBoxMenuFont"
  }
});
