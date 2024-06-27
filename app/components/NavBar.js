import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MySpace from "../screens/MySpace/MySpace";
import Relaxation from "../screens/Relaxation/Relaxation";
import Discussion from "../screens/Discussion/Discussion";
import Chat from "../screens/Chat/Chat";
import BookSession from "../screens/BookSession/BookSession";
import Bookings from "../screens/BookSession/forDocs/Bookings";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Octicons } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import AuthContext from "../auth/context";
import NotificationContext from "../notifications/NotificationContext";

const Tab = createBottomTabNavigator();

const NavBar = (props) => {
  const authContext = useContext(AuthContext);
  const { unreadNotifCount } = useContext(NotificationContext);
  return (
    <Tab.Navigator
      initialRouteName="MySpace"
      screenOptions={{
        headerRight: () => (
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("NotificationsScreen")} // Navigate to Notifications screen
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {unreadNotifCount > 0 ? (
                <View style={styles.unread}>
                  <Text style={styles.num}>
                    {unreadNotifCount > 5 ? "5+" : unreadNotifCount}
                  </Text>
                </View>
              ) : null}
              <Feather name="bell" size={30} style={styles.notifications} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Settings")}
            >
              <Ionicons
                name="settings-outline"
                size={30}
                style={styles.settings}
              />
            </TouchableOpacity>
          </View>
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
        name="MySpace"
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
      {authContext.user.role == "user" ||
      authContext.user.role == "volunteer" ? (
        <Tab.Screen
          name="Book Session"
          component={BookSession}
          listeners={({ navigation }) => ({
            tabPress: () => navigation.navigate("Book Session"),
          })}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="calendar-outline" size={30} />;
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          listeners={({ navigation }) => ({
            tabPress: () => navigation.navigate("Bookings"),
          })}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="calendar-outline" size={30} />;
            },
          }}
        />
      )}
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
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: "row",
  },
  notifications: {
    marginTop: 1,
  },
  unread: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "red",
    padding: 2,
    margin: 2,
    alignItems: "center",
    marginLeft: 10,
    marginTop: 15,
  },
  num: {
    color: "white",
    fontWeight: "500",
    padding: 2,
  },
});
