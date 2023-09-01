import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
//import Button from "../../components/Button";

const MySpace = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <Text>MySpace</Text>
        <Button
          title="Press me to go to discussion"
          onPress={() => props.navigation.navigate("Discussion")}
        ></Button>
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
