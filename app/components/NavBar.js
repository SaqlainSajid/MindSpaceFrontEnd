import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Octicons } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";

const NavBar = () => {
  const theme = useColorScheme();
  const iconColor = theme === "dark" ? "grey" : "black";
  const textColor = theme === "dark" ? "grey" : "black";

  return (
    <View
      style={theme === "dark" ? styles.navContainerDark : styles.navContainer}
    >
      <TouchableOpacity style={styles.icon} onPress={() => {}}>
        <MaterialCommunityIcons name="meditation" size={30} color={iconColor} />
        <Text style={[styles.text, { color: textColor }]}>Relaxation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Octicons name="comment-discussion" size={30} color={iconColor} />
        <Text style={[styles.text, { color: textColor }]}>Discussion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Entypo name="home" size={30} color={iconColor} />
        <Text style={[styles.text, { color: textColor }]}>My Space</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="calendar" size={30} color={iconColor} />
        <Text style={[styles.text, { color: textColor }]}>Book Session</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="chatbox-ellipses" size={30} color={iconColor} />
        <Text style={[styles.text, { color: textColor }]}>Vent</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  navContainerDark: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
  },
  icon: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
  },
  textDark: {
    fontSize: 10,
    color: "white",
  },
});
