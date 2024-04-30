import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

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

const stack = createStackNavigator();

const StackNavigator = () => {
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
