import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import bookingsApi from "../../../api/bookingsApi";
import BookingComponent from "../../../components/BookingComponent";
import { useFocusEffect } from "@react-navigation/native";
const AdminPending = () => {
  const [Pending, setPending] = useState([]);
  const getPending = async () => {
    try {
      const response = await bookingsApi.getAdminPendingBookings();
      setPending(response.data);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      throw error;
    }
  };
  useFocusEffect(
    useCallback(() => {
      getPending();
    }, [])
  );
  const handleBookingUpdate = (updatedBooking) => {
    setPending((prevPending) =>
      prevPending.filter((booking) => booking._id !== updatedBooking)
    );
  };
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <ScrollView style={{ flex: 1, margin: 10 }}>
          {Pending?.length > 0 ? (
            Pending.map((booking, index) => (
              <BookingComponent
                key={index}
                booking={booking}
                onBookingUpdate={handleBookingUpdate}
              />
            ))
          ) : (
            <Text style={styles.noBookings}>
              Pending Bookings will be shown here
            </Text>
          )}
        </ScrollView>
      </View>
    </ScreenTemplate>
  );
};

export default AdminPending;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 10,
  },
  noBookings: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "500",
  },
});
