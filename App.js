import { StyleSheet, StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import StackNavigator from "./app/components/StackNavigator";
import AuthNavigator from "./app/components/AuthNavigator";
import { useCallback, useEffect, useState } from "react";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { NotificationProvider } from "./app/notifications/NotificationContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [appLoaded, setAppLoaded] = useState(false);
  const theme = useColorScheme();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    const user = JSON.parse(atob(token.split(".")[1]));
    setUser(user);
  };

  useEffect(() => {
    restoreToken();
    setAppLoaded(true);
  }, []);

  const onLayout = useCallback(async () => {
    if (appLoaded) await SplashScreen.hideAsync();
  }, [appLoaded]);

  if (!appLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayout}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? (
            <NotificationProvider>
              <StackNavigator />
            </NotificationProvider>
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
        <StatusBar
          barStyle={theme === "dark" ? "dark-content" : "light-content"}
        />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
