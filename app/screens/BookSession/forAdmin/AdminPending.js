import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import bookingsApi from "../../../api/bookingsApi";
import BookingComponent from "../../../components/BookingComponent";
import { useFocusEffect } from "@react-navigation/native";

const AdminPending = () => {
  const [pending, setPending] = useState([]);

  const getPending = async () => {
    try {
      const response = await bookingsApi.getAdminPendingBookings();
      setPending(response.data);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPending();
    }, []) // Remove Pending from dependency array to avoid infinite loop
  );

  const handleBookingUpdate = (bookingId) => {
    // Remove the updated booking from the list
    setPending((prevPending) =>
      prevPending.filter((booking) => booking._id !== bookingId)
    );
  };

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <ScrollView style={styles.scrollView}>
          {pending?.length > 0 ? (
            pending.map((booking) => (
              <BookingComponent
                key={booking._id}
                booking={booking}
                onBookingUpdate={handleBookingUpdate}
              />
            ))
          ) : (
            <Text style={styles.noBookings}>
              There are no pending bookings at the moment
            </Text>
          )}
        </ScrollView>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    margin: 10,
  },
  noBookings: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default AdminPending;
