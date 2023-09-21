import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Profile from "./Profile";

const BookSession = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Profile />
      </View>
    </ScreenTemplate>
  );
};

export default BookSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
