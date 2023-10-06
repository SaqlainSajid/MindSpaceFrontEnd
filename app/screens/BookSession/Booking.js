import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Booking = () => {
  const [clicked, setClicked] = useState(true);
  const [btnstyle, setbtnstyle] = useState("unclickedbtn");
  const [txtstyle, setTxtstyle] = useState("unclickedtxt");
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.header}>Duration</Text>
        <TouchableOpacity style={styles.buttoncontainer}>
          <TouchableOpacity
            style={clicked ? styles.clickedbtn : styles.unclickedbtn}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              60 minutes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={clicked ? styles.clickedbtn : styles.unclickedbtn}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              90 minutes
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.header}>Time</Text>
        <TouchableOpacity style={styles.buttoncontainer}>
          <TouchableOpacity
            style={[
              clicked ? styles.clickedbtn : styles.unclickedbtn,
              styles.timebutton,
            ]}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              11:00 am
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              clicked ? styles.clickedbtn : styles.unclickedbtn,
              styles.timebutton,
            ]}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              12:00 pm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              clicked ? styles.clickedbtn : styles.unclickedbtn,
              styles.timebutton,
            ]}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              1:00 pm
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.header}>Date</Text>
        <View>
          <Text>Calendar</Text>
        </View>
        <Text style={styles.header}>Preferred mode of confirmation</Text>
        <TouchableOpacity style={styles.buttoncontainer}>
          <TouchableOpacity
            style={clicked ? styles.clickedbtn : styles.unclickedbtn}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={clicked ? styles.clickedbtn : styles.unclickedbtn}
          >
            <Text style={clicked ? styles.clickedtxt : styles.unclickedtxt}>
              Email
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unclickedbtn}>
          <Text style={styles.unclickedtxt}>Pay Advance</Text>
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
  unclickedbtn: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  clickedbtn: {
    backgroundColor: "#292c52",
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  timebutton: {
    marginHorizontal: 30,
  },
  clickedtxt: {
    color: "white",
  },
  unclickedtxt: {},
});
