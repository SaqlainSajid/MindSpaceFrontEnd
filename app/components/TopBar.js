import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TopBar = () => {
  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Image src="" />
        <Text>Title</Text>
        <Image src="" />
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "blue",
    borderColor: "red",
    borderWidth: 5,
  },
});
