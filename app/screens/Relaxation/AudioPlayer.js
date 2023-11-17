import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { Ionicons } from "react-native-vector-icons";
import ScreenTemplate from "../../components/ScreenTemplate";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(new Audio.Sound());

  useEffect(() => {
    return sound.current
      ? () => {
          sound.current.unloadAsync();
        }
      : undefined;
  }, []);

  const handlePlayPause = async () => {
    if (!isPlaying) {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        require("../../assets/paris.mp3"),
        { shouldPlay: true }
      );
      sound.current = playbackObject;
      setIsPlaying(true);
    } else {
      await sound.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <View style={styles.picview}>
          <Image
            style={styles.image}
            source={require("../../assets/mountain.jpg")}
          ></Image>
        </View>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 10,
            fontWeight: "500",
            fontSize: 20,
          }}
        >
          {" "}
          Best Audio In The Business{" "}
        </Text>
        <TouchableOpacity style={styles.playview} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={20}
            style={{ color: "white", marginLeft: 3 }}
          />
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
  playview: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    height: 45,
    width: 45,
    backgroundColor: "#8772a3",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  picview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    padding: 10,
    borderRadius: 25,
    borderWidth: 5,
    marginBottom: 10,
    borderColor: "#8772a3",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#8772a3",
  },
});
