import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const NotificationComponent = (props) => {
  const { notification } = props.notification;
  return (
    <TouchableOpacity>
      <View style={styles.notifContainer}>
        <Text>{notification.data.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  notifContainer: {
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 2,
    backgroundColor: "white",
  },
});
