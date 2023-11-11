import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const markedDates = {};

  //this makes the current date's background to dark purple and font color to white
  markedDates[yesterday.toISOString().split("T")[0]] = {
    customStyles: {
      container: {
        backgroundColor: "#292c52",
      },
      text: {
        color: "white",
        fontWeight: "bold",
      },
    },
  };

  const theme = {
    textDayFontWeight: "bold",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "bold",
    arrowColor: "black",
  };

  return (
    <Calendar
      markingType={"custom"}
      minDate={yesterday.toISOString().split("T")[0]}
      markedDates={markedDates}
      theme={theme}
      hideExtraDays={true}
      showSixWeeks={false}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
