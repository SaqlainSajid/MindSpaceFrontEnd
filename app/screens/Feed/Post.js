import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Fontisto, Feather } from "react-native-vector-icons";
import React from "react";

const Post = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profile}>
          <Image
            source={props.image}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
          />
          <Text style={{ fontSize: 20 }}>{props.username}</Text>
        </TouchableOpacity>
        <Text>{props.time}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity>
          <Text style={{ fontSize: 16 }}>{props.content}</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 2,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 50,
    marginBottom: 20,
  },
});
