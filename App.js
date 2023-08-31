import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./app/screens/LoginSignup/LoginScreen";
import MySpace from "./app/screens/MySpace/MySpace";
import Relaxation from "./app/screens/Relaxation/Relaxation";
import SignUpScreen from "./app/screens/LoginSignup/SignUpScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MySpace />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
