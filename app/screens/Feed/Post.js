import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Platform,
  Modal,
} from "react-native";
import {
  Ionicons,
  Fontisto,
  Feather,
  FontAwesome,
} from "react-native-vector-icons";
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
  const [userRole, setUserRole] = useState("");
  const [likes, setLikes] = useState(props.likeNum);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const formattedTime = formatDate(props.time);

  useEffect(() => {
    setIsLoading(true);
    getUserName();
    checkIfLiked();
    setIsLoading(false);
  }, []);

  const getUserName = async () => {
    try {
      const res = await usersApi.getUser(props.username);

      if (res.data.name) {
        setUserName(res.data.name);
        setUserRole(res.data.role);
      } else {
        setUserName("user deleted");
        setUserRole("user deleted");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const checkIfLiked = async () => {
    try {
      const res = await postsApi.checkLike(props.postId, authContext.user._id);
      setLiked(res.data.isLikedByUser);
    } catch (error) {
      console.error("Error checking like status:", error.message);
    }
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        setLiked(true);
        const res = await postsApi.addLike(props.postId, authContext.user._id);
        setLikes(res.data.likes);
      } else {
        setLiked(false);
        const res = await postsApi.removeLike(props.postId, authContext.user._id);
        setLikes(res.data.likes);
      }
    } catch (error) {
      console.error("Error handling like:", error.message);
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
    } finally {
      setModalVisible(false);
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <View style={styles.roleBadge}>
            <View style={styles.AdminBadge}>
              <Text style={styles.roleText}>Admin</Text>
            </View>
            <Ionicons name="shield-checkmark" size={15} color="#6A1B9A" />
          </View>
        );
      case "doctor":
        return (
          <View style={styles.roleBadge}>
            <View style={styles.DoctorBadge}>
              <Text style={styles.roleText}>Doctor</Text>
            </View>
            <Fontisto name="doctor" size={15} color="#4A90E2" />
          </View>
        );
      case "volunteer":
        return (
          <View style={styles.roleBadge}>
            <View style={styles.VolunteerBadge}>
              <Text style={styles.roleText}>Volunteer</Text>
            </View>
            <FontAwesome name="user" size={15} color="#43A047" />
          </View>
        );
      default:
        return null;
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
    userRole: userRole,
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
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            {getRoleBadge(userRole)}
          </View>
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
            <Text style={styles.postContent}>{props.content}</Text>
          ) : (
            <Text style={styles.postContent}>
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
          <Text style={styles.likeCount}>{likes}</Text>
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
          <Text style={styles.commentCount}>{props.commentNum}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Feather name="send" size={18} />
        </TouchableOpacity>
        {(authContext.user._id === passingValues.username || authContext.user.role === 'admin') && 
        (
            <TouchableOpacity style={styles.trash} onPress={() => setModalVisible(true)}>
              <Feather name="trash" size={24} color="red" />
            </TouchableOpacity>
        )}
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Confirm deletion</Text>
      <Text style={styles.modalText}>Are you sure you want to delete this post?</Text>
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.buttonClose]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.modalButtonTextClose}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.buttonDelete]}
          onPress={handleDelete}
        >
          <Text style={styles.modalButtonTextDelete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
</View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
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
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    marginRight: 8,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  DoctorBadge: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#4ADCE2",
    marginRight: 3,
  },
  AdminBadge: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#b261e3",
    marginRight: 3,
  },
  VolunteerBadge: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#64be67",
    marginRight: 3,
  },
  roleText: {
    fontSize: 16,
    color: "#000080",
  },
  content: {
    flex: 2,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  postContent: {
    fontSize: 16,
  },
  footer: {
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
  share: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 12,
  },
  commentCount: {
    marginLeft: 5,
    fontSize: 12,
  },
  trash: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18, // Single line text
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "white",
  },
  buttonDelete: {
    backgroundColor: "white",
  },
  modalButtonTextClose: {
    color: "#87CEEB", // Sky blue for Cancel button
    fontWeight: "bold",
    textAlign: "center",
  },
  modalButtonTextDelete: {
    color: "red", // Red for Delete button
    fontWeight: "bold",
    textAlign: "center",
  },
});
