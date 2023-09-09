import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HashtagPost from "./HashtagPost";

const Hashtag = (props) => {
  const posts = props.posts.slice(0, 6);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        props.navigation.navigate("Feed", {
          posts: props.posts,
          title: props.title,
        })
      }
    >
      <Text style={styles.headertext}>{props.title}</Text>
      <View style={styles.postContainer}>
        {posts.map((post, index) => (
          <HashtagPost username={post.username} post={post.post} key={index} />
        ))}
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
    overflow: "hidden",
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
