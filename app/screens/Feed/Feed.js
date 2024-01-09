import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import Post from "./Post";
import Separator from "../Feed/Separator";
import postsApi from "../../api/postsApi";
import filter from "lodash.filter";
import { useFocusEffect } from "@react-navigation/native";

const Feed = ({ route, ...props }) => {
  const [postsData, setPostsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadPosts();
    }, [])
  );

  const loadPosts = async () => {
    const response = await postsApi.getPosts(title);
    if (response.data) {
      setPostsData(response.data);
      setFilteredData(response.data);
    } else {
      setPostsData([]);
      setFilteredData([]);
    }
    setIsLoading(false);
  };

  const { title } = route.params;
  useEffect(() => {
    props.navigation.setOptions({
      title: title,
      headerTitleStyle: { fontSize: 24 },
    });
  }, []);

  //if we're fetching data, we show the loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  const handleSearch = (query) => {
    setSearchInput(query);
    const formattedQuery = query.toLowerCase();
    const filtered = filter(postsData, (post) => {
      return contains(post, formattedQuery);
    });
    setFilteredData(filtered);
  };

  const contains = ({ user, content }, query) => {
    const lowerUser = user.toLowerCase();
    const lowerContent = content.toLowerCase();
    if (lowerUser.includes(query) || lowerContent.includes(query)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.searchView}>
        <Ionicons name="search" size={24} />
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Search for a post..."
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("AddPost")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.feed}>
        {filteredData ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Post
                key={item._id}
                postId={item._id}
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
        ) : null}
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
