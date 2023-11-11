import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import CustomCalendar from "./CustomCalendar";

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

const Booking = (props) => {
  const [selectDuration, setSelectDuration] = useState(0);
  const [selectTime, setSelectTime] = useState(0);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.header}>Duration</Text>
        <View style={styles.durationcontainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            alignItems={"center"}
          >
            {durations.map((item, index) => (
              <TouchableOpacity
                style={
                  index == selectDuration ? styles.btnClicked : styles.button
                }
                onPress={() => setSelectDuration(index)}
              >
                <Text
                  style={
                    index == selectDuration
                      ? styles.btnTxtClicked
                      : styles.btnTxt
                  }
                >
                  {item.quantity} {item.unit}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.header}>Time</Text>
        <View style={styles.timecontainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            alignItems={"center"}
          >
            {times.map((item, index) => (
              <TouchableOpacity
                style={index == selectTime ? styles.btnClicked : styles.button}
                onPress={() => setSelectTime(index)}
              >
                <Text
                  style={
                    index == selectTime ? styles.btnTxtClicked : styles.btnTxt
                  }
                >
                  {item.hour}:{item.minute == 0 ? "00" : item.minute}
                  {item.period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.header}>Date</Text>
        <View style={styles.calendarcontainer}>
          <CustomCalendar />
        </View>
        <View style={styles.paycontainer}>
          <TouchableOpacity
            style={styles.btnpayment}
            onPress={() => props.navigation.navigate("PaymentScreen")}
          >
            <Text style={{ color: "green", fontWeight: "bold" }}>
              Pay Advance
            </Text>
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
    flex: 0.15,
    marginVertical: 10,
  },
  timecontainer: {
    flex: 0.15,
    marginVertical: 10,
  },
  calendarcontainer: {
    flex: 0.8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  paycontainer: {
    flex: 0.2,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
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
  btnClicked: {
    backgroundColor: "#292c52",
    flex: 1,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 40,
    borderColor: "#292c52",
  },
  btnTxt: {
    color: "black",
  },
  btnTxtClicked: {
    color: "white",
  },
  btnpayment: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 30,
    height: 50,
    borderColor: "green",
  },
});
