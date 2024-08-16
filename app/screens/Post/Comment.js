import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
import { Ionicons, Feather } from "react-native-vector-icons";
import postsApi from "../../api/postsApi";
import usersApi from "../../api/usersApi";
import AuthContext from "../../auth/context";

const Comment = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.heart);
  
  const [userName, setUserName] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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
    } finally {
      setModalVisible(false);
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

        {(authContext.user._id === props.username || authContext.user.role === 'admin') && (
          <TouchableOpacity style={styles.trash} onPress={() => setModalVisible(true)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal for confirm deletion */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm deletion</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this comment?</Text>
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
  trash: {
    marginLeft: "auto",
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
    fontSize: 18,
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
    color: "#87CEEB",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalButtonTextDelete: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});
