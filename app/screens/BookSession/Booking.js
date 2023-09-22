import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Booking = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>Duration</Text>
        <TouchableOpacity>
          <Text>60 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>90 minutes</Text>
        </TouchableOpacity>
        <Text>Time</Text>
        <TouchableOpacity>
          <Text>11:00 am</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>12:00 pm</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>1:00 pm</Text>
        </TouchableOpacity>
        <Text>Date</Text>
        <View>
          <Text>Calendar</Text>
        </View>
        <Text>Preferrable mode of confirmation</Text>
        <TouchableOpacity>
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Pay Advance</Text>
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
