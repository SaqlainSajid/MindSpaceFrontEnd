import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./app/components/StackNavigator";
import AuthNavigator from "./app/components/AuthNavigator";
import { useEffect, useState } from "react";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const theme = useColorScheme();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    const user = JSON.parse(atob(token.split(".")[1]));
    setUser(user);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? <StackNavigator /> : <AuthNavigator />}
        </NavigationContainer>
        <StatusBar
          barStyle={theme === "dark" ? "dark-content" : "light-content"}
        />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
