import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  useColorScheme,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const MySpace = () => {
  const theme = useColorScheme();

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
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
        <View style={styles.topBar}>
          <Image
            style={styles.image}
            source={require("../../assets/userprofile.png")}
          />
          <Text style={styles.topText}>My Space</Text>
          <Icon name="settings-outline" size={40} color="#0A1145" />
        </View>
        <View style={styles.main}>
          <View style={styles.resume}>
            <View style={styles.resumeCard}></View>
          </View>
          <View style={styles.cardContainer}></View>
        </View>
        <View style={styles.navBar}>
          <Icon name="settings-outline" size={40} color="#0A1145" />
          <Icon name="settings-outline" size={40} color="#0A1145" />
          <Icon name="settings-outline" size={40} color="#0A1145" />
          <Icon name="settings-outline" size={40} color="#0A1145" />
          <Icon name="settings-outline" size={40} color="#0A1145" />
        </View>
      </LinearGradient>
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </SafeAreaView>
  );
};

export default MySpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1145",
    width: Dimensions.get("screen").width,
    justifyContent: "space-between",
  },
  gradient: {
    flex: 1,
  },
  topBar: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 2,
  },
  image: {
    height: 50,
    width: 50,
  },
  topText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
  },
  resume: {
    flex: 1,
    borderColor: "green",
    borderWidth: 2,
  },
  resumeCard: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "red",
    margin: 20,
    backgroundColor: "white",
  },
  cardContainer: {
    flex: 2,
    borderColor: "green",
    borderWidth: 2,
  },
  navBar: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 2,
  },
});
