import {
  StyleSheet,
  StatusBar,
  useColorScheme,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const ScreenTemplate = (props) => {
  const theme = useColorScheme();

  return (
    <SafeAreaView edges={["right", "left"]} style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[
          "#dedae6",
          "#cfbede",
          "#8381bd",
          "#8381bd",
          "#cfbede",
          "#dedae6",
        ]}
        locations={[0, 0.1, 0.3, 0.7, 0.9, 1]}
      >
        {props.children}
      </LinearGradient>
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </SafeAreaView>
  );
};

export default ScreenTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1145",
    width: Dimensions.get("screen").width,
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  gradient: {
    flex: 1,
  },
});
