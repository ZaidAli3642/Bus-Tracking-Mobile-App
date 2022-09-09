import Register from "./app/screens/Register";
import AppLoading from "expo-app-loading";
import useAppFonts from "./app/hooks/useAppFonts";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
