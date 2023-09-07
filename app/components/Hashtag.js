import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Hashtag = (props) => {
  const posts = props.posts;
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Text style={styles.headertext}>{props.title}</Text>
      <View style={styles.postContainer}>
        <Text style={styles.username}>{posts[0].username}:</Text>
        <Text style={styles.post}>{posts[0].post}</Text>
      </View>
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
  headertext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  username: {
    color: "grey",
    fontSize: 12,
    fontStyle: "italic",
  },
  post: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
