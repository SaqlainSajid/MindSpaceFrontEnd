import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import notificationsApi from "../api/notificationsApi";

import NavBar from "./NavBar";
import Discussion from "../screens/Discussion/Discussion";
import Chat from "../screens/Chat/Chat";
import BookSession from "../screens/BookSession/BookSession";
import Relaxation from "../screens/Relaxation/Relaxation";
import Profile from "../screens/Profile/Profile";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import AudioPlayer from "../screens/Relaxation/AudioPlayer";
import Feed from "../screens/Feed/Feed";
import AddPost from "../screens/Discussion/AddPost";
import PostScreen from "../screens/Post/PostScreen";
import Booking from "../screens/BookSession/Booking";
import PaymentScreen from "../screens/BookSession/PaymentScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import CallScreen from "../screens/Chat/CallScreen";
import Bookings from "../screens/BookSession/forDocs/Bookings";
import BookingSettings from "../screens/BookSession/forDocs/BookingSettings";
import DayScreen from "../screens/BookSession/forDocs/DayScreen";
import VolunteerChatScreen from "../screens/Chat/VolunteerChatScreen";
import AvailableSlots from "../screens/BookSession/forDocs/AvailableSlots";
import UpcomingAppointments from "../screens/BookSession/UpcomingAppointments";
import AuthContext from "../auth/context";

const stack = createStackNavigator();

const StackNavigator = () => {
  //at the start of the app, when people login, a push token is saved in the database
  //for the specific user that logged in, in their user model
  //this is used to send notifications to them

  const authContext = useContext(AuthContext);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
      Alert.alert("Notification", notification.request.content.body);
    });
  }, []);
  const registerForPushNotifications = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      try {
        const res = await Notifications.getExpoPushTokenAsync();
        token = res.data;
        notificationsApi.register(token, authContext.user._id);
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  return (
    <stack.Navigator
      initialRouteName="My Space"
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Back",
      }}
    >
      <stack.Screen name="My Space" component={NavBar} />
      <stack.Screen name="Discussion" component={Discussion} />
      <stack.Screen
        name="Feed"
        component={Feed}
        options={{ headerShown: true }}
      />
      <stack.Screen
        name="AddPost"
        component={AddPost}
        options={{ headerShown: true }}
      />
      <stack.Screen name="Chat" component={Chat} />
      <stack.Screen
        name="Book Session"
        component={BookSession}
        options={{ headerShown: true, headerTitle: "Book a Session" }}
      />
      <stack.Screen
        name="UpcomingAppointments"
        component={UpcomingAppointments}
        options={{ headerShown: true, headerTitle: "All Bookings" }}
      />
      <stack.Screen
        name="Bookings"
        component={Bookings}
        options={{ headerShown: true, headerTitle: "Bookings" }}
      />
      <stack.Screen name="Relaxation" component={Relaxation} />
      <stack.Screen
        name="AudioPlayer"
        component={AudioPlayer}
        options={{ headerShown: true }}
      />
      <stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />
      <stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
      <stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <stack.Screen
        name="Booking"
        component={Booking}
        options={{ headerShown: true, headerTitle: "Book a Session" }}
      />
      <stack.Screen
        name="BookingSettings"
        component={BookingSettings}
        options={{ headerShown: true, headerTitle: "Booking Settings" }}
      />
      <stack.Screen
        name="AvailableSlots"
        component={AvailableSlots}
        options={{ headerShown: true, headerTitle: "Pick a Time" }}
      ></stack.Screen>
      <stack.Screen
        name="DayScreen"
        component={DayScreen}
        options={{
          headerShown: true,
          headerTitle: "Select Time of Availability",
        }}
      />
      <stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerShown: true, headerTitle: "Pay Advance" }}
      />
      <stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: true, headerTitle: "Chat" }}
      />
      <stack.Screen
        name="VolunteerChatScreen"
        component={VolunteerChatScreen}
        options={{ headerShown: true, headerTitle: "Chat" }}
      />
      <stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{ headerShown: true, headerTitle: "Call" }}
      />
    </stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
