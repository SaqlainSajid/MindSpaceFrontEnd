import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";

const BookingComponent = (props) => {
  const booking = props.booking;
  const authContext = useContext(AuthContext);
  const role = authContext.user.role;

  return (
    <TouchableOpacity>
      <View style={styles.main}>
        <View style={styles.imageName}>
          <Image
            style={styles.pic}
            source={require("../assets/mountain.jpg")}
          />
          <Text style={styles.name}>
            {role == "user" ? booking.docName : booking.patientName}
          </Text>
        </View>
        <View style={styles.date}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {new Date(booking.date).toLocaleTimeString([], {
              timeZone: "Asia/Dhaka",
              hour: "2-digit",
              minute: "2-digit",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingComponent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 15,
  },
  pic: { alignSelf: "center", width: 50, height: 50, borderRadius: 100 },
  name: {
    marginStart: 15,
    fontWeight: "300",
    fontSize: 20,
  },
  imageName: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
});
