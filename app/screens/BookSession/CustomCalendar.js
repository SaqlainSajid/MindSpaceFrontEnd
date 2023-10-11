import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const today = new Date();
  const markedDates = {};

  for (let i = 1; i < today.getDate(); i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    markedDates[date.toISOString().split("T")[0]] = {
      disabled: true,
      disableTouchEvent: true,
      dotColor: "gray",
    };
  }

  return (
    <Calendar
      minDate={today.toISOString().split("T")[0]}
      markedDates={markedDates}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
