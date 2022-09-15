import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animationDuration: 10,
      animation: "slide_from_bottom",
    }}
  >
    <Stack.Screen name="Login" component={Login} />
    {/* <Stack.Screen name="Register" component={Register} /> */}
  </Stack.Navigator>
);

export default AuthNavigator;
