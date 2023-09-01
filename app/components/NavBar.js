import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MySpace from "../screens/MySpace/MySpace";
import Relaxation from "../screens/Relaxation/Relaxation";
import Discussion from "../screens/Discussion/Discussion";
import Chat from "../screens/Chat/Chat";
import BookSession from "../screens/BookSession/BookSession";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Octicons } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

const NavBar = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="My Space"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Ionicons
              name="settings-outline"
              size={30}
              style={styles.settings}
            />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Image
              source={require("../assets/mountain.jpg")}
              style={styles.profileimage}
            />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 10,
        },
        headerStyle: { height: 100 },
      }}
    >
      <Tab.Screen
        name="Relaxation"
        component={Relaxation}
        listeners={({ navigation }) => ({
          tabPress: () => navigation.navigate("Relaxation"),
        })}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="meditation" size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="Discussion"
        component={Discussion}
        listeners={({ navigation }) => ({
          tabPress: () => navigation.navigate("Discussion"),
        })}
        options={{
          tabBarIcon: () => {
            return <Octicons name="comment-discussion" size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="My Space"
        component={MySpace}
        listeners={({ navigation }) => ({
          tabPress: () => navigation.navigate("My Space"),
        })}
        options={{
          tabBarIcon: () => {
            return <Entypo name="home" size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="Book Session"
        component={BookSession}
        listeners={({ navigation }) => ({
          tabPress: () => navigation.navigate("Book Session"),
        })}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="calendar" size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="Vent"
        component={Chat}
        listeners={({ navigation }) => ({
          tabPress: () => navigation.navigate("Vent"),
        })}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="chatbubble-ellipses" size={30} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  profileimage: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  settings: {
    marginBottom: 10,
    marginRight: 10,
  },
});
