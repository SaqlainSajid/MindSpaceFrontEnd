import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { Ionicons } from "react-native-vector-icons";
import ScreenTemplate from "../../components/ScreenTemplate";
import Slider from "@react-native-community/slider";

const AudioPlayer = (props) => {
  const audioFile = props.route.params.audio;
  const [isPlaying, setIsPlaying] = useState(false);
  const [googleAudio, setGoogleAudio] = useState(null);
  const [sound, setSound] = useState(new Audio.Sound());
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAudio(); // Fetch audio when the screen starts
    return sound.current
      ? async () => {
          await sound.current.unloadAsync();
        }
      : undefined;
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    if (isPlaying) {
      sound.current.setOnPlaybackStatusUpdate(null);
      sound.current.setOnPlaybackStatusUpdate((status) => {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.pauseAsync();
      }
    };
  }, []);

  const getAudio = async () => {
    try {
      const { sound: audio } = await Audio.Sound.createAsync(
        {
          uri: `https://drive.google.com/uc?id=${audioFile.id}`,
        },
        { shouldPlay: false, positionMillis: position }
      );
      setGoogleAudio(audio);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading audio:", error);
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!isPlaying) {
      if (!googleAudio) {
        // If audio is not loaded, return early
        return;
      }
      sound.current = googleAudio;
      await sound.current.playAsync();
      setIsPlaying(true);
    } else {
      await sound.current.pauseAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const handleSeek = async (positionMillis) => {
    await sound.current.setPositionAsync(positionMillis);
    setPosition(positionMillis);
  };

  useEffect(() => {
    if (position === duration) {
      setIsPlaying(false);
      setPosition(0);
    }
  }, [position, duration]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <View style={styles.picview}>
          <Image
            style={styles.image}
            source={require("../../assets/mountain.jpg")}
          ></Image>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: "20",
              marginBottom: 20,
            }}
          >
            {audioFile.name.replace(".mp3", "")}
          </Text>
          {position ? (
            <Text>
              {Math.floor(position / 60000)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor((position % 60000) / 1000)
                .toString()
                .padStart(2, "0")}
            </Text>
          ) : (
            <Text>00:00</Text>
          )}
          <Slider
            style={{ width: "100%", height: 40 }}
            value={position / duration || 0}
            maximumValue={1}
            minimumValue={0}
            step={0.001}
            thumbTintColor="#8772a3"
            maximumTrackTintColor="#ccc"
            minimumTrackTintColor="#8772a3"
            onSlidingComplete={(value) => handleSeek(value * duration)}
          />

          <TouchableOpacity style={styles.playview} onPress={handlePlayPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={20}
              style={{ color: "white", marginLeft: 3 }}
            />
          </TouchableOpacity>
        </View>
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
    height: 50,
    width: 50,
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
    borderColor: "#8772a3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  image: {
    width: 250,
    height: 250,
    borderColor: "#8772a3",
    shadowColor: "#8772a3",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
