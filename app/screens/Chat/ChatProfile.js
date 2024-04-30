import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import usersApi from "../../api/usersApi";

const ChatProfile = (props) => {
  const [user, setUser] = useState(null);
  const navigation = props.nav;
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await usersApi.getUser(props.room);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error); // Log any errors
    }
  };

  return (
    <TouchableOpacity
      key={props.room}
      style={{
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 15,
      }}
      onPress={() =>
        navigation.navigate("VolunteerChatScreen", { roomId: props.room })
      }
    >
      <View style={styles.container}>
        <Image
          style={styles.pic}
          source={require("../../assets/mountain.jpg")}
        />
        <Text style={styles.name}>{user?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    padding: 10,
  },
  pic: { alignSelf: "center", width: 50, height: 50, borderRadius: 100 },
  name: {
    marginStart: 15,
    fontWeight: 300,
    fontSize: 20,
  },
});
