import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
// import bookingsApi from "../../api/bookingsApi";

const AdminConfirmed = () => {
//   const [Confirmed, setConfirmed] = useState([]);
//   const getAdminConfirmed = async () => {
//     try {
//       const response = await bookingsApi.getConfirmedBookings(userId);
//       setConfirmed(response.data);
//     } catch (error) {
//       console.error("Error fetching confirmed bookings:", error);
//       //throw error; // Re-throw the error to handle it in the calling code
//     }
//   };
  return (
    <ScreenTemplate>
      <View style={styles.main}>
      <Text style={styles.noBookings}>
        Please Confirmed the selected bookings
      </Text>
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
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "500",
  },
});
