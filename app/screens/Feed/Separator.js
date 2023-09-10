import { StyleSheet, View } from "react-native";
import React from "react";

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default ItemSeparator;

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "lightgrey",
  },
});
