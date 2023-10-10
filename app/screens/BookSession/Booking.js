import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import ScreenTemplate from "../../components/ScreenTemplate";

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
        <View style={styles.durationcontainer}>
          <ScrollView horizontal={true} alignItems={"center"}>
            {durations.map((item) => (
              <TouchableOpacity style={styles.button}>
                <Text>
                  {item.quantity} {item.unit}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.header}>Time</Text>
        <View style={styles.timecontainer}>
          <ScrollView horizontal={true} alignItems={"center"}>
            {times.map((item) => (
              <TouchableOpacity style={styles.button}>
                <Text>
                  {item.hour}:{item.minute}
                  {item.period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.header}>Date</Text>
        <View style={styles.calendarcontainer}>
          <Calendar />
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
    flex: 0.7,
  },
  modeconfirmcontainer: {
    flex: 0.1,
    flexDirection: "row",
    marginTop: 15,
  },
  paycontainer: {
    flex: 0.1,
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
