import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";

const Screen = ({ children }) => {
  return <View style={styles.screen}>{children}</View>;
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
