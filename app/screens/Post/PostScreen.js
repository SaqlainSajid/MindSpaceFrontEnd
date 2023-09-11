import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const PostScreen = ({ route, ...props }) => {
  const { username } = route.params;
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>{username}</Text>
        <Text>PostScreen</Text>
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
});
