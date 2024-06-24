import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../components/ScreenTemplate";

const NotificationsScreen = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>Notifications</Text>
      </View>
    </ScreenTemplate>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
});
