import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HashtagPost = (props) => {
  const post = props.post.slice(0, 12);
  const username = props.username;
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.username}>{username}:</Text>
      <Text style={styles.post}>{post}...</Text>
    </View>
  );
};

export default HashtagPost;

const styles = StyleSheet.create({
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
