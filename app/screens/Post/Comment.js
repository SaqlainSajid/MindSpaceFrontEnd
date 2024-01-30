import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "react-native-vector-icons";
import postsApi from "../../api/postsApi";
import usersApi from "../../api/usersApi";
import AuthContext from "../../auth/context";

const Comment = (props) => {
  const authContext = useContext(AuthContext);
  const [liked, setLiked] = useState(props.isLiked || false);
  const [userName, setUserName] = useState(props.username);

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    const res = await usersApi.getUser(props.username);
    setUserName(res.data.name);
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await postsApi.unlikeComment(props.postId, props.commentId, props.userId);
      } else {
        await postsApi.likeComment(props.postId, props.commentId, props.userId);
      }
      setLiked(!liked);

      props.onRefresh();

    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await postsApi.deleteComment(props.postId, props.commentId);
      if (props.onDeleteComment) {
        props.onDeleteComment();
      }
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
            {userName}
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
        {authContext.user._id === props.username && (
          <TouchableOpacity style={styles.trash} onPress={handleDelete}>
            <Feather name="trash" size={24} color="red" />
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
