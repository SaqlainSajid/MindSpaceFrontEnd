import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import HashtagPost from "../screens/Discussion/HashtagPost";

const Hashtag = (props) => {
  const posts = props.posts;
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Text style={styles.headertext}>{props.title}</Text>
      <HashtagPost username={posts[0].username} post={posts[0].post} />
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
