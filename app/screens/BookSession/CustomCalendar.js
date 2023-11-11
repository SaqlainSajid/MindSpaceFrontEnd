import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  //for some reason, today gives me the date of tomorrow, so I got yesterday's date and used it
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const markedDates = {};

  //this makes the current date's font color to purple
  markedDates[yesterday.toISOString().split("T")[0]] = {
    customStyles: {
      text: {
        color: "#8772a3",
        fontWeight: "bold",
      },
    },
  };

  //this makes the pressed date background to dark purple and font to white
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  if (selectedDate) {
    markedDates[selectedDate] = {
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
  }

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
      onDayPress={onDayPress}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
