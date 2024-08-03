import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NotificationComponent = (props) => {
  const nav = useNavigation();
  const { notification } = props.notification;
  const navigate = (type) => {
    if (type === "chat") {
      nav.navigate("ChatScreen");
    }
  };
  return (
    <TouchableOpacity onPress={() => navigate(notification.notifType)}>
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
