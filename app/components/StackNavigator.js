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
import Audio from "../screens/Relaxation/Audio";
import Feed from "../screens/Feed/Feed";
import AddPost from "../screens/Discussion/AddPost";
import PostScreen from "../screens/Post/PostScreen";
import Booking from "../screens/BookSession/Booking";
import PaymentScreen from "../screens/BookSession/PaymentScreen";

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
      <stack.Screen name="Relaxation" component={Relaxation} />
      <stack.Screen
        name="Audio"
        component={Audio}
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
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerShown: true, headerTitle: "Pay Advance" }}
      />
    </stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
