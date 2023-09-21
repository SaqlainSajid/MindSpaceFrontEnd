import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.pic} source={require("../../assets/mountain.jpg")} />
      <Text>Name</Text>
      <Text>Degrees</Text>
      <Text>Specialization</Text>
      <TouchableOpacity style={styles.button}>
        <Text>BOOK NOW</Text>
      </TouchableOpacity>
      <Text>Price</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
