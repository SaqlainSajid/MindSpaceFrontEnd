import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Fontisto } from "react-native-vector-icons";

const Replies = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.replycontainer}>
        <View style={styles.profile}>
          <Image
            source={props.userpic}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              textDecorationLine: "underline",
              color: "white",
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {props.username}
          </Text>
        </View>
        <View style="reply">
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {props.content}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.reaction}>
          <Ionicons name="heart-circle" color="#fe251b" size={24} />
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{props.heart}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.reaction, { marginLeft: 10 }]}>
          <Fontisto name="comment" size={18} />
          <Text style={{ marginLeft: 5, fontSize: 12 }}>reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Replies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginTop: 14,
  },
  replycontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#a491c0",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  profile: {
    flex: 1,
    flexDirection: "row",
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    marginLeft: 8,
    flexDirection: "row",
  },
});
