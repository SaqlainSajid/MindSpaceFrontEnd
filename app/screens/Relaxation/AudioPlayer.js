import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Audio } from "expo-av";
import { Ionicons } from "react-native-vector-icons";
import ScreenTemplate from "../../components/ScreenTemplate";

const AudioPlayer = () => {
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <Text>Audio</Text>
        <TouchableOpacity
          style={styles.play}
          // onPress={this.loadAudio}
        >
          <Ionicons name="play" size={35} style={{ color: "white" }} />
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 25,
  },
  play: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    height: 80,
    width: 80,
    backgroundColor: "red",
    alignSelf: "center",
    marginBottom: 20,
  },
});
