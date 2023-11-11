import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Ionicons } from "react-native-vector-icons";

const CallScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <View style={!isVisible && { display: "none" }}>
          <Text
            style={{
              fontWeight: 600,
              fontSize: 30,
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            You are in a call
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 30,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            14:59
          </Text>
        </View>
        {!isVisible && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 30,
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              Call Ended
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.disconnect, !isVisible && { display: "none" }]}
          onPress={() => setIsVisible(false)}
        >
          <Ionicons name="call" size={35} style={{ color: "white" }} />
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 25,
    margin: 20,
    padding: 20,
    backgroundColor: "white",
  },
  disconnect: {
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
