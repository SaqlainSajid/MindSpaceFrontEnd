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
import usersApi from "../../api/usersApi";

const Chat = (props) => {
  const authContext = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomsData, setRoomsData] = useState({});
  const [usersData, setUsersData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState([]);

  const loadRoom = async () => {
    try {
      const response = await roomsApi.getRoom(authContext.user._id);
      setRoom(response.data[0]);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const loadRooms = async () => {
    try {
      const response = await roomsApi.getRooms();
      if (response.data) {
        const roomsInfo = response.data;
        setRooms(roomsInfo.map(room => room.roomId));
        
        // Create a map of room data
        const roomDataMap = {};
        roomsInfo.forEach(room => {
          roomDataMap[room.roomId] = room;
        });
        setRoomsData(roomDataMap);

        // Load user data for each room
        const userPromises = roomsInfo.map(room => usersApi.getUser(room.roomId));
        const userResponses = await Promise.all(userPromises);
        
        // Create a map of user data
        const userDataMap = {};
        userResponses.forEach((response, index) => {
          userDataMap[roomsInfo[index].roomId] = response.data;
        });
        setUsersData(userDataMap);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadRooms();
      loadRoom();
    }, [])
  );

  useEffect(() => {
    const newSocket = io.connect(
      "https://mindspace-backend-4bec1331aedc.herokuapp.com/"
    );
    setSocket(newSocket);

    newSocket.on("connect", () => {
      loadRooms();
    });

    // Handle new messages
    newSocket.on("message", async (msg) => {
      const roomId = msg.roomId;
      
      // Update rooms order only for new messages
      setRooms(prevRooms => {
        if (!prevRooms.includes(roomId)) return prevRooms;
        const otherRooms = prevRooms.filter(r => r !== roomId);
        return [roomId, ...otherRooms];
      });

      // Reload room data
      try {
        const roomResponse = await roomsApi.getRoom(roomId);
        if (roomResponse.data && roomResponse.data[0]) {
          setRoomsData(prev => ({
            ...prev,
            [roomId]: roomResponse.data[0]
          }));
        }
      } catch (error) {
        console.error("Error updating room data:", error);
      }
    });

    // Handle new rooms
    newSocket.on("newRoom", async (roomId) => {
      try {
        // Load room data
        const roomResponse = await roomsApi.getRoom(roomId);
        const userResponse = await usersApi.getUser(roomId);

        if (roomResponse.data && roomResponse.data[0]) {
          setRoomsData(prev => ({
            ...prev,
            [roomId]: roomResponse.data[0]
          }));

          setUsersData(prev => ({
            ...prev,
            [roomId]: userResponse.data
          }));

          setRooms(prevRooms => {
            if (!prevRooms.includes(roomId)) {
              return [...prevRooms, roomId];
            }
            return prevRooms;
          });
        }
      } catch (error) {
        console.error("Error handling new room:", error);
      }
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (authContext.user.role === "user") {
    return (
      <ScreenTemplate>
        <View style={styles.main}>
          <View style={styles.headerview}>
            <Text style={styles.headerText}>Hey! How's it going? </Text>
            <Text style={styles.secondaryText}>
              No matter how you're feeling, our dedicated volunteers are always
              here to guide you through it! Give us a call or text!
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
                {room?.UnreadUser > 0 ? (
                  <View style={styles.unread}>
                    <Text style={styles.num}>
                      {room.UnreadUser > 5 ? "5+" : room.UnreadUser}
                    </Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
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
  } else if (authContext.user.role === "volunteer") {
    return (
      <ScreenTemplate>
        <View style={styles.volunteerMain}>
          <View style={styles.volunteerText}>
            <Text style={styles.headerText}>Chat list</Text>
            <Text style={styles.secondaryText}>
              All volunteers see the same chat list, and all volunteers can chat
              with anyone from the list.
            </Text>
          </View>
          <ScrollView style={styles.chatList}>
            {rooms.map((roomId) => (
              <ChatProfile 
                key={roomId} 
                room={roomId} 
                nav={props.navigation}
                userData={usersData[roomId]}
              />
            ))}
          </ScrollView>
        </View>
      </ScreenTemplate>
    );
  } else if (authContext.user.role === "doctor") {
    return (
      <ScreenTemplate>
        <View style={styles.main}>
          <View style={styles.headerview}>
            <Text style={styles.headerText}>Welcome, Doctor!</Text>
            <Text style={styles.secondaryText}>
              The chat feature is not available for doctors. Please use the
              designated sections for doctors.
            </Text>
          </View>
        </View>
      </ScreenTemplate>
    );
  } else {
    return (
      <ScreenTemplate>
        <View style={styles.main}>
          <Text style={styles.headerText}>Invalid role</Text>
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
  unread: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    padding: 2,
    margin: 2,
    alignItems: "center",
    marginLeft: 10,
  },
  num: {
    color: "white",
    fontWeight: "500",
  },
});
