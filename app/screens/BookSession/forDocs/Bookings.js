import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import Button from "../../../components/Button";

const Bookings = (props) => {
  const handlePress = () => {
    props.navigation.navigate("BookingSettings");
  };
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.topText}>Upcoming Bookings</Text>
        </View>
        <View style={styles.listContainer}></View>
        <View style={styles.footer}>
          <Button
            class="primary"
            text="Booking Settings"
            onPress={handlePress}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topView: {
    flex: 0.1,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  footer: {
    marginBottom: 20,
  },
});
