import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";

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
          <View style={styles.reactions}>
            <TouchableOpacity style={styles.heart}>
              <Ionicons name="heart-circle" color="#fe251b" size={24} />
              <Text>{passingValues.reactions.heart}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.comment}>
              <Fontisto name="comment" size={18} />
              <Text>{passingValues.reactions.heart}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="send" size={18} />
            </TouchableOpacity>
          </View>
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
    flex: 0.3,
    borderWidth: 2,
    borderColor: "red",
  },
  reactions: {
    borderWidth: 2,
    borderColor: "black",
  },
});
