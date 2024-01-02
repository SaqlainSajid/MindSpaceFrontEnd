import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const SettingsScreen = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => props.navigation.navigate("Login Screen")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  setting: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
});
