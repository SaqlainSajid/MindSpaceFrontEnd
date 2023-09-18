import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Comment = (props) => {
  return (
    <View style={styles.commentcontainer}>
      <View style={styles.comment}>
        <Text>
          {props.username}:{props.content}
        </Text>
        <Text>{props.heart}</Text>
      </View>
      <View style={styles.replies}>
        <Text>
          {props.replies[0].username}:{props.replies[0].content}
        </Text>
        <Text>{props.replies[0].heart}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentcontainer: {
    backgroundColor: "purple",
    margin: 20,
    borderRadius: 10,
  },
});
