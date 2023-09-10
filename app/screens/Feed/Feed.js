import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import Post from "./Post";
import ItemSeparator from "../../components/ItemSeparator";

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
        <FlatList
          data={posts}
          keyExtractor={(item) => item.post.id}
          renderItem={({ item }) => (
            <Post
              key={item.post.id}
              username={item.username}
              content={item.post.content}
              image={item.userpic}
              time={item.post.time}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
          scrollEnabled={true}
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
