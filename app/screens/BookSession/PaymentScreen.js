import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ScreenTemplate from "../../components/ScreenTemplate";
import bookingsApi from "../../api/bookingsApi";
import Button from "../../components/Button";

const PaymentScreen = () => {
  const route = useRoute();
  const { values, navigation } = route.params;
  const [bookingId, setBookingId] = useState("");

  const bookingData = {
    date: values.date,
    timeFrom: values.timeFrom,
    timeTo: values.timeTo,
    docId: values.docId,
    userId: values.userId,
  };

  const handleConfirm = async () => {
    try {
      const response = await bookingsApi.addBooking(bookingData);
      setBookingId(response.data._id);
      navigation.navigate("Book Session");
    } catch (error) {
      console.error("Error adding booking:", error);
      Alert.alert(
        "Booking Failed",
        "Sorry, this slot has already been booked.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  };

  return (
    <ScreenTemplate>
      <Text>PaymentScreen</Text>
      <Text>{values.userId}</Text>
      <Text>{values.docId}</Text>
      <Text>{values.timeFrom.toISOString()}</Text>
      <Text>{values.timeTo.toISOString()}</Text>
      <TouchableOpacity>
        <Text onPress={handleConfirm}>Confirm</Text>
      </TouchableOpacity>
    </ScreenTemplate>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
