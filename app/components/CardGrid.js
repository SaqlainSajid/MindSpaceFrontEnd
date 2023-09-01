import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CardGrid = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default CardGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
