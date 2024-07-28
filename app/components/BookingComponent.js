import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";

const BookingComponent = (props) => {
  const booking = props.booking;
  const authContext = useContext(AuthContext);
  const role = authContext.user.role;
  const handleAccept = () => {
    console.log("Accepted booking:", booking._id);
  };

  const handleDeny = () => {
    console.log("Denied booking:", booking._id);
  };
  return (
    <TouchableOpacity>
      <View style={styles.main}>
        {role === "admin" ? (
          <View>
            <Text style={styles.name}>
              <Text style={styles.boldText}>
                Patient: {booking.patientName}
              </Text>
              {"\n"}
              Doctor: {booking.docName}
              {"\n"}
              Patient Age: {booking.patientAge}
              {"\n"}
              Patient Gender: {booking.patientGender}
              {"\n"}
              Phone Number: {booking.phoneNumber}
              {"\n"}
              Concern: {booking.concern}
              {"\n"}
              Payment Last 4 Digits: {booking.paymentNumber4digits}
              {"\n"}
              <Text style={styles.boldText}>
                Transaction ID: {booking.transactionId}
              </Text>
              {"\n"}
              Price: {booking.price}
              {"\n"}
              Emergency Contact: {booking.emergencyContact}
              {"\n"}
              Email: {booking.email}
              {"\n"}
              Confirmed: {booking.confirmed ? "Yes" : "No"}
              {"\n"}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAccept}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.denyButton}
                  onPress={handleDeny}
                >
                  <Text style={styles.buttonText}>Deny</Text>
                </TouchableOpacity>
              </View>
            </Text>
          </View>
        ) : (
          <View style={styles.imageName}>
            <Image
              style={styles.pic}
              source={require("../assets/mountain.jpg")}
            />
            <Text style={styles.name}>
              {role == "user" ? booking.docName : booking.patientName}
            </Text>
          </View>
        )}
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
    alignbookings: "flex-start",
    padding: 15,
  },
  pic: { alignSelf: "center", width: 50, height: 50, borderRadius: 100 },
  name: {
    marginStart: 15,
    fontWeight: "300",
    fontSize: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  imageName: {
    flexDirection: "row",
    alignbookings: "center",
    marginBottom: 10,
  },
  date: {
    flexDirection: "row",
    alignbookings: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  denyButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
