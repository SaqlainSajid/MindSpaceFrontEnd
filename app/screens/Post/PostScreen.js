import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import Comment from "./Comment";
import usersApi from "../../api/usersApi";
import postsApi from "../../api/postsApi";
import AuthContext from "../../auth/context";
import Share from "react-native-share";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

const PostScreen = ({ route }) => {
  const authContext = useContext(AuthContext);
  const { passingValues } = route.params;
  const formattedTime = formatDate(passingValues.time);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(passingValues.likeNum);
  const [liked, setLiked] = useState(passingValues.liked);

  useEffect(() => {
    setIsLoading(true);
    getPost();
    checkIfLiked();
    getUserName();
  }, []);

  const getUserName = async () => {
    const res = await usersApi.getUser(passingValues.username);
    setUserName(res.data.name);
    setIsLoading(false);
  };

  const getPost = async () => {
    const res = await postsApi.getPost(passingValues.postId);
    setLikes(res.data.likes);
  };

  const checkIfLiked = async () => {
    const res = await postsApi.checkLike(
      passingValues.postId,
      authContext.user._id
    );
    setLiked(res.data.isLikedByUser);
  };

  const handleDelete = async () => {
    try {
      await postsApi.DeletePost(passingValues.postId);
    } catch (error) {
      console.error("Error deleting Psot:", error);
    }
  }

  const handleShare = async () => {
    try {
      const result = await Share.open({
        message: 'Check out this post by ${userName}: ${passingValues.content}',
      });
      console.log(result);
    } catch (error) {
      console.error("Error sharing post:", error.message);
    }
  };

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      const res = await postsApi.addLike(
        passingValues.postId,
        authContext.user._id
      );
      setLikes(res.data.likes);
    }
    if (liked) {
      setLiked(false);
      const res = await postsApi.removeLike(
        passingValues.postId,
        authContext.user._id
      );
      setLikes(res.data.likes);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.profile}>
              <Image style={styles.image} source={passingValues.userpic} />
              <Text style={styles.username}>{userName}</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              {formattedTime}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>
              {passingValues.content}
            </Text>
          </View>
          <View style={styles.reactions}>
            <TouchableOpacity style={styles.heart} onPress={handleLike}>
              {liked ? (
                <Ionicons name="heart-circle" color="#fe251b" size={24} />
              ) : (
                <Ionicons name="heart-circle" color="lightgrey" size={24} />
              )}
              <Text style={{ marginLeft: 5, fontSize: 12 }}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.comment}>
              <Fontisto name="comment" size={18} />
              <Text style={{ marginLeft: 5, fontSize: 12 }}>
                {passingValues.commentNum}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Feather name="send" size={18} />
            </TouchableOpacity>
            {authContext.user._id === passingValues.userId && (
              <TouchableOpacity style ={styles.trash} onPress={handleDelete}>
                <Feather name="trash" size={24} color="red"/>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.separator} />
          <View style={styles.commentSection}>
            {passingValues.comments.map((item) => (
              <Comment
                key={item._id}
                userpic={require("../../assets/mountain.jpg")}
                username={item.user}
                content={item.content}
                heart={item.likes}
                replies={item.replies}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.addcomment}>
          <TextInput style={styles.input} placeholder="Write something..." />
          <TouchableOpacity>
            <Ionicons name="send-sharp" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "white",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  header: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 10,
  },
  content: {
    height: "auto",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  reactions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 50,
    marginBottom: 10,
  },
  heart: {
    flexDirection: "row",
    alignItems: "center",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: 5,
    backgroundColor: "lightgrey",
  },
  commentSection: {
    flex: 3,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  addcomment: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 0.9,
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 10,
    padding: 10,
  },
});
