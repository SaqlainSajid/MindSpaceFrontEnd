import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";
import bookingsApi from "../api/bookingsApi";

const BookingComponent = (props) => {
  const booking = props.booking;
  const authContext = useContext(AuthContext);
  const role = authContext.user.role;

  const handleAccept = async () => {
    try {
      const response = await bookingsApi.confirmBooking(booking._id);
      const updatedBooking = response.data;
      props.onBookingUpdate(booking._id);
      console.log("Accepted Booking: ", booking._id);
    } catch (error) {
      console.error("Error Accepting Booking", error);
    }
  };

  const handleDeny = async () => {
    try {
      const response_denied = await bookingsApi.DenyBooking(booking._id);
      props.onBookingUpdate(booking._id);
      console.log("Denied booking:", booking._id);
    } catch (error) {
      console.error("Error While Rejecting Booking", error);
    }
  };

  return (
    <View style={styles.main}>
      {role === "admin" ? (
        <View>
          <View style={styles.date_topRight}>
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
          <View style={styles.bookingDetails}>
            <Text style={styles.boldText}>Patient: {booking.patientName}</Text>
            <Text style={styles.boldText}>Doctor: {booking.docName}</Text>
            <Text>Patient Age: {booking.patientAge}</Text>
            <Text>Patient Gender: {booking.patientGender}</Text>
            <Text>Phone Number: {booking.phoneNumber}</Text>
            <Text>Concern: {booking.concern}</Text>
            <Text style={styles.boldText}>
              Payment Last 4 Digits: {booking.paymentNumber4digits}
            </Text>
            <Text style={styles.boldText}>
              Transaction ID: {booking.transactionId}
            </Text>
            <Text>Price: {booking.price}</Text>
            <Text>Emergency Contact: {booking.emergencyContact}</Text>
            <Text>Email: {booking.email}</Text>
            <Text>Confirmed: {booking.confirmed ? "Yes" : "No"}</Text>
          </View>
          {!booking.confirmed && (
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
          )}
        </View>
      ) : (
        <View style={styles.imageName}>
          <Image
            style={styles.pic}
            source={require("../assets/mountain.jpg")}
          />
          <View style={styles.nameTime}>
            <Text style={styles.name}>{booking.docName}</Text>
            <Text style={styles.time}>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bookingDetails: {
    marginVertical: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "40%",
  },
  denyButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "40%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  date_topRight: {
    alignSelf: "flex-end",
  },
  imageName: {
    flexDirection: "row",
    alignItems: "center",
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameTime: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  time: {
    color: "#666",
  },
});

export default BookingComponent;
