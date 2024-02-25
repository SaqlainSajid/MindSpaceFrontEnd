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

const Booking = ({ route, navigation }) => {
  const { values } = route.params;
  const docId = values.docId;
  const daysOfWeek = values.daysOfWeek;

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.header}>Date</Text>
        <View style={styles.calendarcontainer}>
          <CustomCalendar
            daysOfWeek={daysOfWeek}
            nav={navigation}
            docId={docId}
          />
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
