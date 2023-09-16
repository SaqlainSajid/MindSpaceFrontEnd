import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

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
          <Text>heart: {passingValues.reactions.heart}</Text>
          <Text>comment: {passingValues.reactions.heart}</Text>
        </View>
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
  header: {
    marginTop: 10,
    marginHorizontal: 5,
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
    flex: 0.2,
    justifyContent: "center",
  },
});
