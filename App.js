import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./app/screens/LoginSignup/LoginScreen";
import MySpace from "./app/screens/MySpace/MySpace";
import Relaxation from "./app/screens/Relaxation/Relaxation";
import SignUpScreen from "./app/screens/LoginSignup/SignUpScreen";
import NavBar from "./app/components/NavBar";

export default function App() {
  const theme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
