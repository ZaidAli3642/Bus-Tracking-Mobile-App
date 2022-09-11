import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./app/navigation/MainNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { useAuth } from "./app/context/AuthContext";
import useAppFonts from "./app/hooks/useAppFonts";
import { colors } from "./app/config";
import myTheme from "./app/theme/theme";

export default function App() {
  const { user, setUser, AuthContext, appIsReady } = useAuth();
  const { fontsLoaded } = useAppFonts();

  if (!appIsReady || !fontsLoaded) return null;

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={myTheme}>
          {user ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
