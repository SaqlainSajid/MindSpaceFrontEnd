import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";

export default function WelcomeScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to</Text>
        <Image
          style={styles.logo}
          source={require("../../assets/mindspaceicon.png")}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>The space for your MIND is here!</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              text="Sign Up"
              class="primary"
              style={{ width: 200 }}
              onPress={() => props.navigation.navigate("Signup Screen")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text="Login"
              class="primary"
              style={{ width: 200 }}
              onPress={() => props.navigation.navigate("Login Screen")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "black",
    borderWidth: 2,
  },
  logo: {
    height: 250,
    width: 250,
    objectFit: "scale-down",
  },
  headerContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    margin: 10,
  },
  footerContainer: {
    flex: 0.5,
    padding: 15,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 40,
  },
});
