import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Booking = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.header}>Duration</Text>
        <TouchableOpacity style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button}>
            <Text>60 minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>90 minutes</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.header}>Time</Text>
        <TouchableOpacity style={styles.buttoncontainer}>
          <TouchableOpacity style={[styles.button, styles.timebutton]}>
            <Text>11:00 am</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.timebutton]}>
            <Text>12:00 pm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.timebutton]}>
            <Text>1:00 pm</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.header}>Date</Text>
        <View>
          <Text>Calendar</Text>
        </View>
        <Text style={styles.header}>Preferred mode of confirmation</Text>
        <TouchableOpacity style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Email</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttoncontainer: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    overflow: "scroll",
  },
  button: {
    // backgroundColor: "#292c52",
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  timebutton: {
    marginHorizontal: 30,
  },
});
