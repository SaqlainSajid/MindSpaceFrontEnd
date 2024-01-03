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
import { useState } from "react";
import AuthContext from "./app/auth/context";

export default function App() {
  const [user, setUser] = useState();
  const theme = useColorScheme();
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
