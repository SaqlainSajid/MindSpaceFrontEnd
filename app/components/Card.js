import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Card = (props) => {
  return (
    <View style={styles.card}>
      <Button title={props.title} onPress={props.onPress}></Button>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "blue",
  },
});
