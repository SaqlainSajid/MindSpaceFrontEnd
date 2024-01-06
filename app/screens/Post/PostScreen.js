import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import Comment from "./Comment";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

const PostScreen = ({ route }) => {
  const { passingValues } = route.params;
  const formattedTime = formatDate(passingValues.time);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.profile}>
              <Image style={styles.image} source={passingValues.userpic} />
              <Text style={styles.username}>{passingValues.username}</Text>
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
            <TouchableOpacity style={styles.heart}>
              <Ionicons name="heart-circle" color="#fe251b" size={24} />
              <Text style={{ marginLeft: 5, fontSize: 12 }}>
                {passingValues.likeNum}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.comment}>
              <Fontisto name="comment" size={18} />
              <Text style={{ marginLeft: 5, fontSize: 12 }}>
                {passingValues.commentNum}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="send" size={18} />
            </TouchableOpacity>
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
