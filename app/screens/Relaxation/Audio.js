import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Audio = () => {
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <Text>Audio</Text>
      </View>
    </ScreenTemplate>
  );
};

export default Audio;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 25,
  },
});
