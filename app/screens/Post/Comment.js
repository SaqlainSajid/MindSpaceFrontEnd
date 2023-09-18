import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Comment = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentcontainer}>
        <View style={styles.profile}>
          <Image
            source={props.userpic}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              textDecorationLine: "underline",
              color: "white",
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {props.username}:
          </Text>
        </View>
        <View style="comment">
          <Text style={{ color: "white", textAlign: "left" }}>
            {props.content}
          </Text>
        </View>
      </View>
      <Text>{props.heart}</Text>
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
  container: {
    height: "auto",
  },
  commentcontainer: {
    flex: 1,
    backgroundColor: "purple",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  profile: {
    flex: 1,
    flexDirection: "row",
  },
});
