import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Hashtag = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Hashtag;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexBasis: "33%",
    aspectRatio: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
