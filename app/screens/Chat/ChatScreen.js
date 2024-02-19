import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import AuthContext from "../../auth/context";

subscribe = false;
const ChatScreen = () => {
  const authContext = useContext(AuthContext);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const newSocket = io.connect(
      "https://mindspace-backend-4bec1331aedc.herokuapp.com/"
    );
    setSocket(newSocket);

    setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    // Join a room
    newSocket.emit("joinRoom", { roomId: 2 });

    // Listen for incoming messages
    newSocket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      // Disconnect from the Socket.io server when the component unmounts
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      // Send the message to the server
      socket.emit("sendMessage", {
        roomId: 2,
        message: { content: message, senderId: authContext.user._id },
      });
      setMessage("");
    }
  };

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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
        <Text>Finding Volunteers...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScreenTemplate>
        <View style={styles.main}>
          <View style={styles.chatdisplay}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  msg.senderId === authContext.user._id
                    ? styles.currentUserMessage
                    : styles.otherUserMessage,
                ]}
              >
                <Text
                  key={index}
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  {msg.content}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.inputview}>
            <TouchableOpacity>
              <Ionicons
                name="folder-outline"
                size={24}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={styles.input}
              placeholder="what's on your mind..."
            />
            <TouchableOpacity onPress={sendMessage}>
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
    </KeyboardAvoidingView>
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
    marginTop: 5,
  },
  input: {
    flex: 1,
    borderColor: "lightgrey",
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 2,
  },
  inputview: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  message: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  currentUserMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#8772a3",
  },
  otherUserMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3e0a70",
  },
});
