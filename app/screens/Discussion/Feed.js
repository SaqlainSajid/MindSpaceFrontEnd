import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Feed = ({ route }) => {
  const { posts } = route.params;
  return (
    <ScreenTemplate>
      <View>
        <Text>Feed</Text>
        {posts.map((post) => (
          <Text key={post.id}>{post.post}</Text>
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default Feed;

const styles = StyleSheet.create({});
