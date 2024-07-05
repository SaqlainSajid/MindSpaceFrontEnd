import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import NotificationContext from "./NotificationContext";
import notificationsApi from "../api/notificationsApi";
import AuthContext from "../auth/context";
import NotificationComponent from "./NotificationComponent";

const NotificationsScreen = (props) => {
  const { setUnreadNotifCount } = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setUnreadNotifCount(0);
    const resetNotifs = async (userId) => {
      const res = await notificationsApi.reset(userId);
    };
    const getNotifs = async (userId) => {
      const res = await notificationsApi.getAll(userId);
      setNotifications(res.data.data);
    };
    resetNotifs(authContext.user._id);
    getNotifs(authContext.user._id);
    setIsloading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    <ScreenTemplate>
      <ScrollView style={{ flex: 1, margin: 10 }}>
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <NotificationComponent key={index} notification={notif} />
          ))
        ) : (
          <Text>Sorry, you have no notifications</Text>
        )}
      </ScrollView>
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
