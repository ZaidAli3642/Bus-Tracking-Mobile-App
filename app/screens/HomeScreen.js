import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      blurRadius={5}
      source={require("../assets/background-image.jpg")}
    >
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/BTS.png")}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login as Driver"
          style={styles.button}
          onPress={() =>
            navigation.navigate("Login", {
              loginUser: "drivers",
            })
          }
        />
        <AppButton
          title="Login as Parent"
          style={[styles.button, styles.buttonColor]}
          onPress={() =>
            navigation.navigate("Login", {
              loginUser: "parent",
            })
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    borderRadius: 50,
    marginVertical: 5,
  },
  buttonColor: {
    backgroundColor: "tomato",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    position: "absolute",
    top: 70,
    width: 150,
    height: 150,
  },
});

export default HomeScreen;
