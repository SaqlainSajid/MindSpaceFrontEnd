import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = ({ daysOfWeek }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDate, setDisabledDate] = useState(null);

  const filteredDays = daysOfWeek
    .filter((obj) => obj.timeFrom && obj.timeTo) // Filter out objects with values for "timeFrom" and "timeTo"
    .map((obj) => obj.day);

  const dayNumberMap = {
    MON: 0,
    TUE: 1,
    WED: 2,
    THU: 3,
    FRI: 4,
    SAT: 5,
    SUN: 6,
  };

  const filteredDayNumbers = filteredDays.map(
    (dayAbbreviation) => dayNumberMap[dayAbbreviation]
  );

  //for some reason, today gives me the date of tomorrow, so I got yesterday's date and used it
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const markedDates = {};
  const disabledDates = {};

  //this makes the current date's font color to purple
  markedDates[yesterday.toISOString().split("T")[0]] = {
    customStyles: {
      text: {
        color: "#8772a3",
        fontWeight: "bold",
      },
    },
  };

  //this makes the tomorrow's date's font color to black
  markedDates[today.toISOString().split("T")[0]] = {
    customStyles: {
      text: {
        color: "black",
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

  if (disabledDate) {
    disabledDates[disabledDate] = {
      customStyles: {
        container: {
          backgroundColor: "#292c52",
        },
        text: {
          color: "grey",
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

  const isDayEnabled = (day) => {
    const Day = new Date(day.dateString).getDay();
    return filteredDayNumbers.includes(Day);
  };

  //disabled dates

  return (
    <Calendar
      markingType={"custom"}
      minDate={yesterday.toISOString().split("T")[0]}
      markedDates={markedDates}
      theme={theme}
      hideExtraDays={true}
      showSixWeeks={true}
      onDayPress={onDayPress}
      disabledDates={(date) => !isDayEnabled(date)}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
