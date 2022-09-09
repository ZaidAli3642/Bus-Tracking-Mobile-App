import { StyleSheet, Image, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import fonts from "../config/fonts";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { AppTextInput, Form, SubmitButton } from "../components/Form";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(12).required().label("Password"),
});

const Login = ({ navigation }) => {
  return (
    <Screen>
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <Image
          source={require("../assets/login.jpg")}
          style={styles.loginImage}
        />
        <Text style={styles.heading}>Login</Text>

        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          <AppTextInput
            label="Email/CNIC"
            name="email"
            autoCorrect={false}
            autoComplete="email"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <AppTextInput
            label="Password"
            name="password"
            autoCorrect={false}
            autoComplete="off"
            autoCapitalize="none"
            textContentType="password"
            keyboardType="default"
            secureTextEntry
          />

          <SubmitButton title="LOGIN" />
        </Form>
        <View style={styles.account}>
          <AppText>Don't have an account?</AppText>
          <AppText
            style={styles.register}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AppText>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  account: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 30,
  },
  heading: {
    fontSize: 40,
    color: colors.mediumBlack,
    fontFamily: fonts.PoppinsBold,
    marginTop: 20,
  },
  input: {
    fontSize: 15,
    color: colors.lightBlack,
    marginVertical: 10,
  },
  loginImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  register: {
    marginLeft: 7,
    color: colors.blue,
  },

  text: {
    backgroundColor: "red",
  },
});

export default Login;
