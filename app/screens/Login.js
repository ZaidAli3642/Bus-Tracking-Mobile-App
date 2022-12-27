import { StyleSheet, Image, Text, ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import fonts from "../config/fonts";
import colors from "../config/colors";
import { AppTextInput, Form, SubmitButton } from "../components/Form";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import * as storage from "../storage/storeSession";
import { handleParentlogin } from "../firebase/firebaseCalls/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";
import AppTextMaskInput from "../components/Form/AppTextMaskInput";

const validationSchema = Yup.object().shape({
  nationalIdentityNumber: Yup.string().required().label("National Id"),
  password: Yup.string().required().label("Password"),
});

const Login = ({ route }) => {
  const { setUser } = useContext(AuthContext);

  const { loginUser } = route.params;
  console.log("Login User : ", loginUser);
  const login = async (values) => {
    const user = await handleParentlogin(values, loginUser);
    console.log("User : ", user);
    await storage.saveSession(user);
    const userCollection = doc(database, loginUser, user.id);
    await updateDoc(userCollection, { isLoggedIn: true });
    setUser(user);
  };

  return (
    <Screen>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="position">
          <Image
            source={require("../assets/login.jpg")}
            style={styles.loginImage}
          />
          <Text style={styles.heading}>Login</Text>

          <Form
            initialValues={{ nationalIdentityNumber: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={login}
          >
            <AppTextMaskInput
              label="National Identity Number"
              name="nationalIdentityNumber"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              textContentType="none"
              keyboardType="numeric"
              mask={"99999-9999999-9"}
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
        </KeyboardAvoidingView>
      </ScrollView>
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
