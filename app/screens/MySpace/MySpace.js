import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import NavBar from "../../components/NavBar";

const MySpace = () => {
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <Text>MySpace</Text>
      </View>
    </ScreenTemplate>
  );
};

export default MySpace;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
