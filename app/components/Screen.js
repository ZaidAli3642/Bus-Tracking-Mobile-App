import { StyleSheet, View, StatusBar } from "react-native";

const Screen = ({ children }) => {
  return <View style={styles.screen}>{children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
