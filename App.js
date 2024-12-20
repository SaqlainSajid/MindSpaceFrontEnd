import { StyleSheet, StatusBar, useColorScheme, View } from "react-native";
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
    const prepareApp = async () => {
      await restoreToken();
      setAppLoaded(true); // Signal that the app is ready
    };

    prepareApp();
  }, []);

  const onLayout = useCallback(async () => {
    if (appLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  if (!appLoaded) return null;

  return (
    <SafeAreaProvider>
      {/* Wrap the entire app with a parent View for layout measurement */}
      <View style={{ flex: 1 }} onLayout={onLayout}>
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
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
