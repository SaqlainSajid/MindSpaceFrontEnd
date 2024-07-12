import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
const AdminConfirmed = () => {
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
