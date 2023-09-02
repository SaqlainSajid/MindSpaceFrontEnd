import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { imagePaths } from "../screens/MySpace/MySpace";

const Card = (props) => {
  const src = imagePaths[props.imageName];
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Image resizeMode="contain" style={styles.image} source={src} />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-around",
  },
  image: {
    height: "50%",
    width: "50%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
