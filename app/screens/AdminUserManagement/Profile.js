import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const UserProfile = (props) => {
  // Log the props to verify they are being passed correctly
  //console.log("User profile props:", props);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.pic} source={props.pic} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

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
    justifyContent: "center",
    marginTop: 10,
  },
  pic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});
