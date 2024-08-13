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
      props.onBookingUpdate(updatedBooking);
      console.log("Accepted Booking: ", booking._id);
    } catch (error) {
      console.error("Error Accepting Booking", error);
    }
  };

  const handleDeny = async () => {
    try {
      const response_denied=await bookingsApi.DenyBooking(booking._id);
      props.onBookingUpdate(booking._id);
      console.log("Denied booking:", booking._id);
    } catch (error) {
      console.error("Error While Rejecting Booking",error)
    }
  };
  return (
    <TouchableOpacity>
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
            <Text style={styles.name}>
              <Text style={styles.boldText}>
                Patient: {booking.patientName}
              </Text>
              {"\n"}
              <Text style={styles.boldText}>Doctor: {booking.docName}</Text>
              {"\n"}
              Patient Age: {booking.patientAge}
              {"\n"}
              Patient Gender: {booking.patientGender}
              {"\n"}
              Phone Number: {booking.phoneNumber}
              {"\n"}
              Concern: {booking.concern}
              {"\n"}
              <Text style={styles.boldText}>
                Payment Last 4 Digits: {booking.paymentNumber4digits}
              </Text>
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
              {!booking.confirmed ? (
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
              ) : (
                ""
              )}
            </Text>
          </View>
        ) : (
          <View style={styles.imageName}>
            <Image
              style={styles.pic}
              source={require("../assets/mountain.jpg")}
            />
            <View style>
              <Text style={styles.name}>
                {role == "user" ? booking.docName : booking.patientName}
              </Text>
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
          </View>
        )}
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
    padding: 10,
  },
  date_topRight: {
    alignSelf: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
  },
  denyButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
