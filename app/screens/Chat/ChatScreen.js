import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

subscribe = false;
const ChatScreen = () => {
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [seconds, minutes]);

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <View style={styles.chatdisplay}></View>
        <View style={styles.inputview}>
          <TouchableOpacity>
            <Ionicons
              name="folder-outline"
              size={24}
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="what's on your mind..."
          />
          <TouchableOpacity>
            <Ionicons name="send-sharp" size={24} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.timer}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          </Text>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 25,
    margin: 20,
    padding: 20,
    backgroundColor: "white",
  },
  chatdisplay: {
    flex: 1,
  },
  timer: {
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8772a3",
    height: 50,
  },
  input: {
    flex: 1,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 20,
    height: "80%",
    paddingHorizontal: 10,
    borderWidth: 2,
  },
  inputview: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
