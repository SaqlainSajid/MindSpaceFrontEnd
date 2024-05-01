import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useFocusEffect } from "@react-navigation/native";
import roomsApi from "../../api/roomsApi";
import AuthContext from "../../auth/context";
import { io } from "socket.io-client";
import ChatProfile from "./ChatProfile";
subscribed = false;

const Chat = (props) => {
  const authContext = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadRooms();
    }, [])
  );

  const loadRooms = async () => {
    try {
      const response = await roomsApi.getRooms();

      if (response.data) {
        const temp = response.data.map((room) => room.roomId);
        setRooms(temp);
      } else {
        console.log("No data found in response"); // Log if no data found
      }
    } catch (error) {
      console.error("Error fetching rooms:", error); // Log any errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Connect to the socket.io server
    const newSocket = io.connect(
      "https://mindspace-backend-4bec1331aedc.herokuapp.com/"
    );
    setSocket(newSocket);

    // Event listener for receiving new rooms
    newSocket.on("newRoom", (room) => {
      if (!rooms.includes(room)) {
        setRooms((prevRooms) => [room, ...prevRooms]);
      }
    });

    // Clean-up function to disconnect socket when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  //if we're fetching data, we show the loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (subscribed === false) {
    if (authContext.user.role === "user") {
      return (
        <ScreenTemplate>
          <View style={styles.main}>
            <View style={styles.headerview}>
              <Text style={styles.headerText}>Hey! How's it going? </Text>
              <Text style={styles.secondaryText}>
                no matter how you're feeling our dedicated volunteers are always
                here to guide you through it! give us a call or text!
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.headerText}>Chat with a volunteer</Text>
              <Text style={styles.secondaryText}>
                You can chat with one of our volunteers for free for 15 minutes!
              </Text>
              <Text style={styles.secondaryText}>
                If you are a subscribed member, you get unlimited chat time for
                just BDT 200/month!
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.navigate("ChatScreen")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.headerText}>Call a volunteer</Text>
              <Text style={styles.secondaryText}>
                You can talk with one of our volunteers for free for 15 minutes!
              </Text>
              <Text style={styles.secondaryText}>
                If you are a subscribed member, you get unlimited talk time for
                just BDT 200/month!
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.navigate("CallScreen")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScreenTemplate>
      );
    } else {
      return (
        <ScreenTemplate>
          <View style={styles.volunteerMain}>
            <View style={styles.volunteerText}>
              <Text style={styles.headerText}>Chat list</Text>
              <Text style={styles.secondaryText}>
                All volunteers see the same chat list, all volunteers can chat
                with anyone from the list
              </Text>
            </View>
            <ScrollView style={styles.chatList}>
              {rooms
                ? rooms.map((room) => (
                    <ChatProfile
                      key={room}
                      nav={props.navigation}
                      room={room}
                    />
                  ))
                : null}
            </ScrollView>
          </View>
        </ScreenTemplate>
      );
    }
  } else {
    return (
      <ScreenTemplate>
        <View style={styles.main}>
          <View style={styles.headerview}>
            <Text style={styles.headerText}>Hey! How's it going? </Text>
            <Text style={styles.secondaryText}>
              no matter how you're feeling our dedicated volunteers are always
              here to guide you through it! give us a call or text!
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.headerText}>Chat with a volunteer</Text>
            <Text style={styles.secondaryText}>
              As a premium member you have unlimited chat time!
            </Text>
            <TouchableOpacity
              style={styles.prmbtn}
              onPress={() => props.navigation.navigate("ChatScreen")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.headerText}>Call a volunteer</Text>
            <Text style={styles.secondaryText}>
              As a premium member you have unlimited Call time!
            </Text>
            <TouchableOpacity
              style={styles.prmbtn}
              onPress={() => props.navigation.navigate("CallScreen")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenTemplate>
    );
  }
};

export default Chat;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  volunteerMain: {
    flex: 1,
    borderRadius: 25,
    padding: 10,
    margin: 10,
    justifyContent: "center",
  },
  volunteerText: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  chatList: {
    flex: 1,
    padding: 10,
  },
  headerview: {
    flex: 0.5,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    paddingTop: 5,
  },
  card: {
    flex: 1,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  btn: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 30,
    height: 50,
    borderColor: "#7ed957",
    backgroundColor: "#7ed957",
  },
  prmbtn: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 60,
    height: 50,
    borderColor: "#7ed957",
    backgroundColor: "#7ed957",
  },
});
