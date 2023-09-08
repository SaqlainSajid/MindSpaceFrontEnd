import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";

const HashtagPost = (props) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{props.username}:</Text>
      <Text style={styles.post}>{props.post}</Text>
    </View>
  );
};

export default HashtagPost;

const styles = StyleSheet.create({
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
