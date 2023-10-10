import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

//have buttons in lists, there might be multiple sessions with multiple times
//there might be multiple times of the day that a doctor can have time
//then basically render the button
//make another fake data file for Doctors and change the BookSession page accordingly
//then import the data here too, then make the horizontally scrollable list
//component for buttons

const durations = [
  { quantity: 15, unit: "minutes" },
  { quantity: 30, unit: "minutes" },
  { quantity: 45, unit: "minutes" },
  { quantity: 60, unit: "minutes" },
  { quantity: 90, unit: "minutes" },
];
const times = [
  { hour: 11, minute: 0, period: "am" },
  { hour: 12, minute: 0, period: "pm" },
  { hour: 1, minute: 30, period: "pm" },
];

const Booking = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.header}>Duration</Text>
        <ScrollView
          horizontal={true}
          alignItems={"center"}
          style={styles.durationcontainer}
        >
          {durations.map((item) => (
            <TouchableOpacity style={styles.button}>
              <Text>
                {item.quantity} {item.unit}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.header}>Time</Text>
        <ScrollView
          horizontal={true}
          alignItems={"center"}
          style={styles.timecontainer}
        >
          {times.map((item) => (
            <TouchableOpacity style={styles.button}>
              <Text>
                {item.hour}:{item.minute}
                {item.period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.header}>Date</Text>
        <View style={styles.calendarcontainer}>
          <Text>Calendar</Text>
        </View>
        <Text style={styles.header}>Preferred mode of confirmation</Text>
        <TouchableOpacity style={styles.modeconfirmcontainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Email</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.paycontainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Pay Advance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  durationcontainer: {
    flex: 0.1,
  },
  timecontainer: {
    flex: 0.1,
  },
  calendarcontainer: {
    flex: 1,
  },
  modeconfirmcontainer: {
    flex: 0.5,
    flexDirection: "row",
    marginTop: 15,
  },
  paycontainer: {
    flex: 0.5,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    // backgroundColor: "#292c52",
    flex: 1,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 40,
  },
});
