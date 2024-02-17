import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Platform,
} from "react-native";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import React, { useState, useEffect, useContext } from "react";
import postsApi from "../../api/postsApi";
import usersApi from "../../api/usersApi";
import AuthContext from "../../auth/context";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

const Post = (props) => {
  const authContext = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [likes, setLikes] = useState(props.likeNum);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formattedTime = formatDate(props.time);

  useEffect(() => {
    setIsLoading(true);
    getUserName();
    checkIfLiked();
    setIsLoading(false);
  }, []);

  const getUserName = async () => {
    const res = await usersApi.getUser(props.username);
    if (res.data.name) {
      setUserName(res.data.name);
    } else {
      setUserName("user deleted");
    }
  };

  const checkIfLiked = async () => {
    const res = await postsApi.checkLike(props.postId, authContext.user._id);
    setLiked(res.data.isLikedByUser);
  };

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      const res = await postsApi.addLike(props.postId, authContext.user._id);
      setLikes(res.data.likes);
    }
    if (liked) {
      setLiked(false);
      const res = await postsApi.removeLike(props.postId, authContext.user._id);
      setLikes(res.data.likes);
    }
  };

  const handleShare = async () => {
    try {
      const postLink = `https://mindspace-backend-4bec1331aedc.herokuapp.com/posts/${passingValues.postId}`;
      const shareOptions = {
        message: `Check out this post by ${userName}:\n\n${passingValues.content}\n\n${postLink}`,
        url: postLink, // URL to open when tapping the shared message (not supported on Android)
      };

      if (Platform.OS === "ios") {
        // For iOS, use Share.share instead of Share.shareSingle
        await Share.share(shareOptions);
      } else {
        await Share.shareSingle(shareOptions);
      }
    } catch (error) {
      console.error("Error sharing post:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await postsApi.DeletePost(passingValues.postId);
      props.navigation.goBack();
    } catch (error) {
      console.error("Error deleting Post:", error);
    }
  };

  const passingValues = {
    postId: props.postId,
    username: props.username,
    content: props.content,
    userpic: props.image,
    time: props.time,
    likeNum: likes,
    commentNum: props.commentNum,
    comments: props.comments,
    liked: liked,
    feedTitle: props.feedTitle,
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

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
        <TouchableOpacity onPress={handleShare}>
          <Feather name="send" size={18} />
        </TouchableOpacity>
        {authContext.user._id === passingValues.username && (
          <TouchableOpacity style={styles.trash} onPress={handleDelete}>
            <Feather name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
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
