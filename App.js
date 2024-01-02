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

export default function App() {
  const theme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
