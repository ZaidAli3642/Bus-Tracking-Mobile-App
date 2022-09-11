import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Icon from "./Icon";

const AppButton = ({ title, onPress, style, IconComponent }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      <View style={[styles.button, style]}>
        {title && <Text style={styles.text}>{title}</Text>}
        {IconComponent}
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
    letterSpacing: 1,
  },
});

export default AppButton;
