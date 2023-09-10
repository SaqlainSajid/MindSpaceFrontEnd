import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import React from "react";

const Post = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={props.image}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
          />
          <Text>{props.username}</Text>
        </View>
        <Text>{props.time}</Text>
      </View>
      <Text>{props.content}</Text>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Ionicons name="heart-circle" color="#fe251b" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="comment" size={18} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 50,
  },
});
