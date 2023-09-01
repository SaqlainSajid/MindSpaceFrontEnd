import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CardRow = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default CardRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    margin: 20,
  },
});
