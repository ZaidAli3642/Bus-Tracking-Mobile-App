import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { colors } from "../config";
import BusDetails from "../screens/BusDetails";
import ChatsScreen from "../screens/ChatsScreen";
import DriverProfile from "../screens/DriverProfile";
import MyProfile from "../screens/MyProfile";
import StudentProfile from "../screens/StudentProfile";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: "Bus Tracking App",
      headerTitleStyle: { color: colors.purple },
      gestureEnabled: true,
      gestureDirection: "horizontal",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      cardShadowEnabled: true,
      cardStyle: { elevation: 5 },
    }}
  >
    <Stack.Screen name="App" component={AppNavigator} />
    <Stack.Screen
      name="Chat"
      component={ChatsScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="StudentProfile" component={StudentProfile} />
    <Stack.Screen name="DriverProfile" component={DriverProfile} />
    <Stack.Screen name="BusDetails" component={BusDetails} />
  </Stack.Navigator>
);

export default MainNavigator;