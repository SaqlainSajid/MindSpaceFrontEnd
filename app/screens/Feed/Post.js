import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import React, { useState, useEffect } from "react";
import postsApi from "../../api/postsApi";
import usersApi from "../../api/usersApi";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

const Post = (props) => {
  const passingValues = {
    postId: props.postId,
    username: props.username,
    content: props.content,
    userpic: props.image,
    time: props.time,
    likeNum: props.likeNum,
    commentNum: props.commentNum,
    comments: props.comments,
  };

  const [userName, setUserName] = useState("");
  const [likes, setLikes] = useState(props.likeNum);
  const [liked, setLiked] = useState(false);

  const formattedTime = formatDate(props.time);

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    const res = await usersApi.getUser(props.username);
    setUserName(res.data.name);
  };

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      const res = await postsApi.addLike(props.postId);
      setLikes(res.data.likes);
    }
    if (liked) {
      setLiked(false);
      const res = await postsApi.removeLike(props.postId);
      setLikes(res.data.likes);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() =>
            props.navigation.navigate("PostScreen", {
              passingValues: passingValues,
            })
          }
        >
          <Image
            source={props.image}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
          />
          <Text style={{ fontSize: 20 }}>{userName}</Text>
        </TouchableOpacity>
        <Text>{formattedTime}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("PostScreen", {
              passingValues: passingValues,
            })
          }
        >
          {props.content.length < 300 ? (
            <Text style={{ fontSize: 16 }}>{props.content}</Text>
          ) : (
            <Text style={{ fontSize: 16 }}>
              {props.content.slice(0, 300)}...
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.heart} onPress={handleLike}>
          {liked ? (
            <Ionicons name="heart-circle" color="#fe251b" size={24} />
          ) : (
            <Ionicons name="heart-circle" color="lightgrey" size={24} />
          )}
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.comment}
          onPress={() =>
            props.navigation.navigate("PostScreen", {
              passingValues: passingValues,
            })
          }
        >
          <Fontisto name="comment" size={18} />
          <Text style={{ marginLeft: 5, fontSize: 12 }}>
            {props.commentNum}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    overflow: "scroll",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 2,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 50,
    marginBottom: 20,
  },
  heart: {
    flexDirection: "row",
    alignItems: "center",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
});
