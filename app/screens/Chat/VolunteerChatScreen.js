import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";
import { ScrollView, TouchableOpacity } from "react-native";
import { io } from "socket.io-client";
import AuthContext from "../../auth/context";
import messagesApi from "../../api/messagesApi";
import { useRoute } from "@react-navigation/native";

const VolunteerChatScreen = () => {
  const route = useRoute();
  const { roomId } = route.params;
  const authContext = useContext(AuthContext);
  const chatScrollViewRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messagesDB, setMessagesDB] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await messagesApi.getMessages(roomId);
      if (response.data) {
        const temp = response.data.map((msg) => msg);
        setMessages(temp);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const newSocket = io.connect(
      "https://mindspace-backend-4bec1331aedc.herokuapp.com/"
    );
    setSocket(newSocket);

    // Join a room
    newSocket.emit("joinRoom", { roomId: roomId, role: authContext.user.role });

    // Listen for incoming messages
    newSocket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setTimeout(() => {
        chatScrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
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
        roomId: roomId,
        message: { content: message, senderId: authContext.user._id },
        role: authContext.user.role,
      });
      setMessage("");
    }
  };

  //if we're fetching data, we show the loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScreenTemplate>
        <View style={styles.main}>
          <ScrollView ref={chatScrollViewRef} style={styles.chatdisplay}>
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
          </ScrollView>
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
        </View>
      </ScreenTemplate>
    </KeyboardAvoidingView>
  );
};

export default VolunteerChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 25,
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    marginBottom: 80,
  },
  chatdisplay: {
    marginBottom: 10,
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
    height: 40,
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
