import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const PostScreen = ({ route, ...props }) => {
  const { passingValues } = route.params;
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Image style={styles.image} source={passingValues.userpic} />
        <Text>{passingValues.username}</Text>
        <Text>{passingValues.content}</Text>
        <Text>{passingValues.time}</Text>
        <Text>heart: {passingValues.reactions.heart}</Text>
        <Text>comment: {passingValues.reactions.heart}</Text>
        <Text>
          {passingValues.comments[0].username}:
          {passingValues.comments[0].content}
        </Text>
        <Text>{passingValues.comments[0].heart}</Text>
        <Text>
          {passingValues.comments[0].replies[0].username}:
          {passingValues.comments[0].replies[0].content}
        </Text>
        <Text>{passingValues.comments[0].replies[0].heart}</Text>
      </View>
    </ScreenTemplate>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
