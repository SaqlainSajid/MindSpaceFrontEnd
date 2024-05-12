import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import bookingsApi from "../../api/bookingsApi";
import BookingComponent from "../../components/BookingComponent";

const PastBookings = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user._id;
  const [Past, setPast] = useState([]);

  useEffect(() => {
    getPast(userId);
  }, []);

  const getPast = async (userId) => {
    try {
      const response = await bookingsApi.getUserPastBookings(userId);
      setPast(response.data);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <ScrollView style={{ flex: 1, margin: 10 }}>
          {Past.length > 0 ? (
            Past.map((booking, index) => (
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

export default PastBookings;

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
