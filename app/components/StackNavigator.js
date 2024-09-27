import { StyleSheet, Text, View, Alert, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Audio } from "expo-av";
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
import NotificationsScreen from "../notifications/NotificationsScreen";
import AuthContext from "../auth/context";
import NotificationContext from "../notifications/NotificationContext";
import AdminBooking from "../screens/BookSession/forAdmin/AdminBooking";
import AdminConfirmed from "../screens/BookSession/forAdmin/AdminConfirmed";
import AdminPending from "../screens/BookSession/forAdmin/AdminPending";
import AdminPrev from "../screens/BookSession/forAdmin/AdminPrev";

const stack = createStackNavigator();

const StackNavigator = () => {
  //at the start of the app, when people login, a push token is saved in the database
  //for the specific user that logged in, in their user model
  //this is used to send notifications to them

  const authContext = useContext(AuthContext);
  const [notification, setNotification] = useState(null);
  const { unreadNotifCount, setUnreadNotifCount } =
    useContext(NotificationContext);

  useEffect(() => {
    registerForPushNotifications();
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        setNotification(notification);
        const { data } = notification.request.content;
        let notif = { data: data };
        console.log(data);
        if (data.message === "You have a new message") {
          notif = { ...notif, notifType: "chat" };
        } else if (data.message === "Your booking has been accepted!") {
          notif = { ...notif, notifType: "bookingAccepted" };
        } else if (
          data.message ===
          "Sorry, your booking has been denied. Take a good look at your transaction ID and other information, then try making a new booking request. Call this number for support: +8801xxxxxxxxx"
        ) {
          notif = { ...notif, notifType: "bookingDenied" };
        } else if (data.message.includes("liked your post")) {
          notif = { ...notif, notifType: "postLike " };
        } else if (data.message.includes("liked your comment")) {
          notif = { ...notif, notifType: "commentLike" };
        } else if (data.message.includes("commented on you post")) {
          notif = { ...notif, notifType: "postComment" };
        }
        else if(data.message === "You have a new pending booking"){
          notif={...notif,notifType:"newPendingBooking"}
        }
        console.log(notif);
        // await notificationsApi.store(notif, authContext.user._id);
        const res = await notificationsApi.increment(authContext.user._id);
        setUnreadNotifCount(res.data.unreadNotifs);
        playNotificationSound();
      }
    );
    return () => subscription.remove();
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
        const { data } = await Notifications.getExpoPushTokenAsync();
        token = data;
        console.log("Expo Push Token:", token);

        await notificationsApi.register(token, authContext.user._id);
      } catch (e) {
        console.error("Error getting push token:", e);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const playNotificationSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/message.mp3") // Ensure you have a notification sound file
    );
    await sound.playAsync();
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
      <stack.Screen name="AdminBooking" component={AdminBooking} />
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
      <stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerShown: true, headerTitle: "Notifications" }}
      />
    </stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
