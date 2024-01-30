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
  Share,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import Comment from "./Comment";
import usersApi from "../../api/usersApi";
import postsApi from "../../api/postsApi";
import AuthContext from "../../auth/context";
import { useNavigation } from "@react-navigation/native";

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
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(passingValues.comments);
  const nav = useNavigation();
  const [commentLikes, setCommentLikes] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getPost();
    checkIfLiked();
    getUserName();
    checkIfCommentLiked();
  }, []);

  const getUserName = async () => {
    const res = await usersApi.getUser(passingValues.username);
    setUserName(res.data.name);
    setIsLoading(false);
  };

  const handleShare = async () => {
    try {
      const postLink = `https://brainy-boa-teddy.cyclic.app/posts/${passingValues.postId}`;
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

  const getPost = async () => {
    const res = await postsApi.getPost(passingValues.postId);
    setLikes(res.data.likes);
    setComments(res.data.replies);
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
      console.error("Error deleting Post:", error);
    }
    nav.navigate("Feed", { title: passingValues.feedTitle });
  };

  const handleAddComment = async () => {
    try {
      if (commentContent.trim() === "") {
        return;
      }

      await postsApi.addCommentToPost(passingValues.postId, {
        content: commentContent,
        user: authContext.user._id,
      });

      // Fetch the updated post after adding the comment
      await getPost();

      // Clear the comment input field
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      // Call your API to delete the comment
      await postsApi.deleteComment(passingValues.postId, commentId);

      // Fetch the updated post after deleting the comment
      await getPost();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const checkIfCommentLiked = async () => {
    const commentLikesInfo = {};
    for (const comment of passingValues.comments) {
      const res = await postsApi.checkCommentLike(
        passingValues.postId,
        comment._id,
        authContext.user._id
      );
      commentLikesInfo[comment._id] = res.data.isLikedByUser;
    }
    setCommentLikes(commentLikesInfo);
  };

  const refreshPost = async () => {
    try {
      // Fetch the updated post details
      await getPost();
    } catch (error) {
      console.error("Error refreshing post:", error);
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
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
              {authContext.user._id === passingValues.username && (
                <TouchableOpacity style={styles.trash} onPress={handleDelete}>
                  <Feather name="trash" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.separator} />
            <View style={styles.commentSection}>
              {comments.map((item) => (
                <Comment
                  key={item._id}
                  userpic={require("../../assets/mountain.jpg")}
                  username={item.user}
                  isLiked={commentLikes[item._id]}
                  content={item.content}
                  heart={item.likes}
                  replies={item.replies}
                  commentId={item._id}
                  postId={passingValues.postId}
                  onRefresh={refreshPost}
                  onDeleteComment={() => handleCommentDelete(item._id)}
                />
              ))}
            </View>
          </ScrollView>
          <View style={styles.addcomment}>
            <TextInput
              style={styles.input}
              placeholder="Write something..."
              value={commentContent}
              onChangeText={(text) => setCommentContent(text)}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Ionicons name="send-sharp" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
