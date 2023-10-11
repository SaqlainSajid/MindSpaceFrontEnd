import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const today = new Date();
  const markedDates = {};

  //   markedDates[today.toISOString().split("T")[0]] = {
  //     customStyles: {
  //       container: {
  //         backgroundColor: "black",
  //       },
  //       text: {
  //         color: "white",
  //         fontWeight: "bold",
  //       },
  //     },
  //   };

  const theme = {
    textDayFontWeight: "bold",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "bold",
    arrowColor: "black",
  };

  return (
    <Calendar
      markingType={"custom"}
      minDate={today.toISOString().split("T")[0]}
      markedDates={markedDates}
      theme={theme}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
