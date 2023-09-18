import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import Comment from "./Comment";

const PostScreen = ({ route }) => {
  const { passingValues } = route.params;

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Image style={styles.image} source={passingValues.userpic} />
            <Text style={styles.username}>{passingValues.username}</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: "300" }}>
            {passingValues.time}
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
              {passingValues.reactions.heart}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.comment}>
            <Fontisto name="comment" size={18} />
            <Text style={{ marginLeft: 5, fontSize: 12 }}>
              {passingValues.reactions.heart}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="send" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.commentSection}>
          <FlatList
            data={passingValues.comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Comment
                key={item.id}
                username={item.username}
                content={item.content}
                heart={item.heart}
                replies={item.replies}
              />
            )}
            ItemSeparatorComponent={<View style={{ height: 10 }} />}
            scrollEnabled={true}
          />
          {/* <Text>
            {passingValues.comments[0].username}:
            {passingValues.comments[0].content}
          </Text>
          <Text>{passingValues.comments[0].heart}</Text>
          <Text>
            {passingValues.comments[0].replies[0].username}:
            {passingValues.comments[0].replies[0].content}
          </Text>
          <Text>{passingValues.comments[0].replies[0].heart}</Text> */}
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
    overflow: "scroll",
  },
});
