import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Replies from "./Replies";
import { Ionicons, Fontisto } from "react-native-vector-icons";

const Comment = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentcontainer}>
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
        <View style="comment">
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
      <View style={styles.replies}>
        {/* <FlatList
          data={props.replies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Replies
              key={item.id}
              userpic={item.userpic}
              username={item.username}
              content={item.content}
              heart={item.heart}
              replies={item.replies}
            />
          )}
          ItemSeparatorComponent={<View style={{ height: 20 }} />}
        /> */}
        {props.replies.map((item) => (
          <Replies
            key={item.id}
            userpic={item.userpic}
            username={item.username}
            content={item.content}
            heart={item.heart}
            replies={item.replies}
          />
        ))}
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
  commentcontainer: {
    flex: 1,
    backgroundColor: "#766195",
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
