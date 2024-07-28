import { StyleSheet, View, Text,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import bookingsApi from "../../../api/bookingsApi";
import BookingComponent from "../../../components/BookingComponent";
const AdminPrev=()=> {
  const [Previous,setPrevious]=useState([]);
  const getPrevious = async () => {
    try {
      const response = await bookingsApi.getAdminPreviousBookings();
      setPrevious(response.data);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
  useEffect(() => {
    getPrevious();
  }, []);
  const renderBookingItem = ({ item }) => (
    <BookingComponent booking={item}/>
  );
  return (
    <ScreenTemplate>
        <View style={styles.main}>
          <ScrollView style={{ flex: 1, margin: 10 }}>
          {Previous?.length > 0 ? (
            Previous.map((booking, index) => (
              <BookingComponent key={index} booking={booking} />
            ))
          ) : (
            <Text style={styles.noBookings}>
              Sorry you have no Previous Bookings at the moment
            </Text>
          )}
        </ScrollView>
        </View>
    </ScreenTemplate>
  )
}

export default AdminPrev

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