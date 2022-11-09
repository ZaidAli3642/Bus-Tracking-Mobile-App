import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { colors } from "../config";
import BusDetails from "../screens/BusDetails";
import ChatsScreen from "../screens/ChatsScreen";
import DriverProfile from "../screens/Parent/DriverProfile";
import MyProfile from "../screens/MyProfile";
import UpdateInformation from "../screens/UpdateInformation";
import AppNavigator from "./AppNavigator";
import StudentsListScreen from "../screens/Driver/StudentsListScreen";
import ShowStudentProfile from "../screens/ShowStudentProfile";
import QRCodeScreen from "../screens/QRCodeScreen";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: { color: colors.purple },
      gestureEnabled: true,
      gestureDirection: "horizontal",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      cardShadowEnabled: true,
      cardStyle: { elevation: 5 },
    }}
  >
    <Stack.Screen
      name="App"
      component={AppNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatsScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="StudentProfile" component={ShowStudentProfile} />
    <Stack.Screen name="StudentList" component={StudentsListScreen} />
    <Stack.Screen name="DriverProfile" component={DriverProfile} />
    <Stack.Screen name="BusDetails" component={BusDetails} />
    <Stack.Screen name="Update" component={UpdateInformation} />
    <Stack.Screen name="QRCode" component={QRCodeScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
