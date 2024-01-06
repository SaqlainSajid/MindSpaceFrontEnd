import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import Post from "./Post";
import Separator from "../Feed/Separator";
import postsApi from "../../api/postsApi";

const Feed = ({ route, ...props }) => {
  const [postsData, setPostsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const response = await postsApi.getPosts(title);
    setPostsData(response.data);
  };

  const { title } = route.params;
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
        <FlatList
          data={postsData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Post
              key={item._id}
              username={item.user}
              content={item.content}
              image={require("../../assets/mountain.jpg")}
              time={item.createdAt}
              likeNum={item.likes}
              commentNum={item.comments}
              comments={item.replies}
              navigation={props.navigation}
            />
          )}
          ItemSeparatorComponent={Separator}
          scrollEnabled={true}
          refreshing={refreshing}
          onRefresh={loadPosts}
        />
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
    borderBottomWidth: 2,
    borderBottomColor: "#cbcbcb",
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
    lineHeight: 24,
  },
  feed: {
    flex: 1,
    overflow: "scroll",
  },
});
