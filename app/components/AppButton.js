import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";

const AppButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
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
