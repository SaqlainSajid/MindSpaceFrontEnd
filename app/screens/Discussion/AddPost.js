import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const AddPost = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "Create",
      headerTitleStyle: { fontSize: 24 },
    });
  }, []);
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Share your thoughts..." />
      </View>
    </ScreenTemplate>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "white",
  },
  input: {},
});
