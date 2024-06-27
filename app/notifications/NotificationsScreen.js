import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import NotificationContext from "./NotificationContext";
import notificationsApi from "../api/notificationsApi";
import AuthContext from "../auth/context";

const NotificationsScreen = (props) => {
  const { setUnreadNotifCount } = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    setUnreadNotifCount(0);
    const resetNotifs = async (userId) => {
      const res = await notificationsApi.reset(userId);
      console.log(res.data.unreadNotifs);
    };
    resetNotifs(authContext.user._id);
  }, []);
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
