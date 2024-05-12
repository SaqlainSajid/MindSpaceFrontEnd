import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import bookingsApi from "../../api/bookingsApi";
import BookingComponent from "../../components/BookingComponent";

const PendingBookings = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user._id;
  const [Pending, setPending] = useState([]);

  useEffect(() => {
    getPending(userId);
  }, []);

  const getPending = async (userId) => {
    try {
      const response = await bookingsApi.getUserPendingBookings(userId);
      setPending(response.data);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <ScrollView style={{ flex: 1, margin: 10 }}>
          {Pending.length > 0 ? (
            Pending.map((booking, index) => (
              <BookingComponent key={index} booking={booking} />
            ))
          ) : (
            <Text style={styles.noBookings}>
              Sorry you have no pending Bookings at the moment
            </Text>
          )}
        </ScrollView>
      </View>
    </ScreenTemplate>
  );
};

export default PendingBookings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 10,
  },
  noBookings: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: 500,
  },
});
