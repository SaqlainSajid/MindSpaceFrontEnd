import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";

const AdminPending = () => {
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <Text style={styles.noBookings}>
          Pending Bookings will be shown here
        </Text>
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
