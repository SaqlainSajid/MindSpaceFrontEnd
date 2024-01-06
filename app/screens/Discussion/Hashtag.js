import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import HashtagPost from "./HashtagPost";

const Hashtag = (props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        props.navigation.navigate("Feed", {
          title: props.title,
        })
      }
    >
      <Text style={styles.headertext}>#{props.title}</Text>
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
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  headertext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContainer: {
    flex: 1,
    marginTop: 20,
  },
});
