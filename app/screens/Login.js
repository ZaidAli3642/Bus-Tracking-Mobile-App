import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";
import { database } from "../firebase/firebaseConfig";

import Screen from "../components/Screen";
import fonts from "../config/fonts";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { AppTextInput, Form, SubmitButton } from "../components/Form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import * as storage from "../storage/storeSession";

const validationSchema = Yup.object().shape({
  nationalIdentityNumber: Yup.string().required().label("National Id"),
  password: Yup.string().required().label("Password"),
});

const Login = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);

  const login = async (values) => {
    const nationalIdentityNumber = Number(values.nationalIdentityNumber);
    const password = values.password;
    const userCollection = collection(database, "parent");
    const q = query(
      userCollection,
      where("nationalIdentityNumber", "==", nationalIdentityNumber),
      where("password", "==", password)
    );
    const userSnapshot = await getDocs(q);

    const user = userSnapshot.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }));
    console.log(user);
    await storage.saveSession(user[0]);
    setUser(user[0]);
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
            <AppTextInput
              label="National Identity Number"
              name="nationalIdentityNumber"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              textContentType="none"
              keyboardType="default"
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
