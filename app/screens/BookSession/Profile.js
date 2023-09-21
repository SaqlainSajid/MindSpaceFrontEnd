import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.pic}
          source={require("../../assets/mountain.jpg")}
        />
        <View style={styles.namedegrees}>
          <Text style={styles.name}>Dr Mustari Sadia Roshni</Text>
          <Text>Degrees</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Text>Specialization</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text>BOOK NOW</Text>
        </TouchableOpacity>
        <Text>Price</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pic: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  namedegrees: {
    flex: 1,
    marginRight: 50,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    flexWrap: "wrap",
    textAlign: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
