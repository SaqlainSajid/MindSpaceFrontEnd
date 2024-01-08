import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const SettingsScreen = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>Settings</Text>
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
});
