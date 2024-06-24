import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "react-native-vector-icons";
import postsApi from "../../api/postsApi";
import usersApi from "../../api/usersApi";
import AuthContext from "../../auth/context";

const Comment = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.heart);

  const [userName, setUserName] = useState();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    const res = await usersApi.getUser(props.username);
    setUserName(res.data.name);
    if (props.likedBy.includes(authContext.user._id)) setLiked(true);
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await postsApi.unlikeComment(
          props.postId,
          props.commentId,
          authContext.user._id
        );
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        await postsApi.likeComment(
          props.postId,
          props.commentId,
          authContext.user._id
        );
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await postsApi.deleteCommentFromPost(props.postId, props.commentId);
      const updatedComments = props.comments.filter(
        (comment) => comment._id !== props.commentId
      );
      props.setComments(updatedComments);
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
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{likes}</Text>
        </TouchableOpacity>

        {authContext.user._id === props.username && (
          <TouchableOpacity style={styles.trash} onPress={handleDelete}>
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
