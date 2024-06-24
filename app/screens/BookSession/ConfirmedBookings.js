import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import bookingsApi from "../../api/bookingsApi";
import BookingComponent from "../../components/BookingComponent";

const ConfirmedBookings = () => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user._id;
  const role = authContext.user.role;
  const [Confirmed, setConfirmed] = useState([]);

  useEffect(() => {
    if (role == "user") {
      getConfirmed(userId);
    } else {
      getDocConfirmed(userId);
    }
  }, []);

  const getConfirmed = async (userId) => {
    try {
      const response = await bookingsApi.getUserConfirmedBookings(userId);
      setConfirmed(response.data);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  const getDocConfirmed = async (userId) => {
    try {
      const response = await bookingsApi.getDocConfirmedBookings(userId);
      setConfirmed(response.data);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <ScrollView style={{ flex: 1, margin: 10 }}>
          {Confirmed.length > 0 ? (
            Confirmed.map((booking, index) => (
              <BookingComponent key={index} booking={booking} />
            ))
          ) : (
            <Text style={styles.noBookings}>
              You have no upcoming Bookings at the moment
            </Text>
          )}
        </ScrollView>
      </View>
    </ScreenTemplate>
  );
};

export default ConfirmedBookings;

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
