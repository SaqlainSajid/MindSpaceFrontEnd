import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState,useCallback } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import bookingsApi from "../../../api/bookingsApi";
import BookingComponent from "../../../components/BookingComponent";
import { useFocusEffect } from "@react-navigation/native";
const AdminConfirmed = () => {
  const [Confirmed, setConfirmed] = useState([]);
  const getConfirmed = async () => {
    try {
      const response = await bookingsApi.getAdminConfirmedBookings();
      setConfirmed(response.data);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
      throw error; 
    }
  };
  useFocusEffect(
    useCallback(() => {
      getConfirmed();
    }, [Confirmed])
  );
  return (
    <ScreenTemplate>
      <View style={styles.main}>
      <ScrollView style={{ flex: 1, margin: 10 }}>
          {Confirmed?.length > 0 ? (
            Confirmed.map((booking, index) => (
              <BookingComponent key={index} booking={booking} />
            ))
          ) : (
            <Text style={styles.noBookings}>
              There are no Confirmed Bookings at the moment
            </Text>
          )}
        </ScrollView>
      </View>
    </ScreenTemplate>
  );
};

export default AdminConfirmed;

const styles = StyleSheet.create({
  main: {
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
