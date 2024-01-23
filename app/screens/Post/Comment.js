import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import postsApi from "../../api/postsApi";

const Comment = (props) => {
  const [liked, setLiked] = useState(props.isLiked);

  const handleLike = async () => {
    try {
      if (liked) {
        await postsApi.removeLikeComment(props.commentId);
      } else {
        await postsApi.addLikeComment(props.commentId);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await postsApi.deleteComment(props.commentId);
      // Assuming you have a callback from the parent to refresh comments after deletion
      props.onDelete();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

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
            {props.username}
          </Text>
        </View>
        <View style={styles.comment}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {props.content}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.reaction} onPress={handleLike}>
          <Ionicons
            name="heart-circle"
            color={liked ? "#fe251b" : "lightgrey"}
            size={24}
          />
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{props.heart}</Text>
        </TouchableOpacity>
        {props.isCurrentUser && (
          <TouchableOpacity
            style={[styles.reaction, { marginLeft: 10 }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
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
    backgroundColor: "#766195",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  profile: {
    flex: 1,
    flexDirection: "row",
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    marginLeft: 8,
    flexDirection: "row",
  },
});
