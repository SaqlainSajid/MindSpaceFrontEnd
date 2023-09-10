import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import Post from "./Post";

const Feed = ({ route, ...props }) => {
  const { posts, title } = route.params;
  useEffect(() => {
    props.navigation.setOptions({
      title: title,
      headerTitleStyle: { fontSize: 24 },
    });
  }, []);
  return (
    <ScreenTemplate>
      <View style={styles.searchView}>
        <Ionicons name="search" size={24} />
        <TextInput style={styles.input} placeholder="Search for a post..." />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("AddPost")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.feed}>
        {posts.map((post) => (
          <Post
            key={post.post.id}
            username={post.username}
            content={post.post.content}
            image={post.userpic}
            time={post.post.time}
          />
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default Feed;

const styles = StyleSheet.create({
  searchView: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 0.8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    height: "40%",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  button: {
    flex: 0.1,
    borderWidth: 1,
    borderRadius: 10,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
  },
  feed: {
    flex: 1,
    overflow: "scroll",
  },
});
