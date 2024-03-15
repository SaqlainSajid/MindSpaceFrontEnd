import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDate, setDisabledDate] = useState(null);

  const daysOfWeek = props.daysOfWeek;
  const navigation = props.nav;
  const docId = props.docId;

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
    const Day = new Date(day.dateString).getDay();
    if (isDayEnabled(day)) {
      setSelectedDate(day.dateString);
      setDisabledDate(null);

      //find the day from daysOfWeek which corresponds to the date that is clicked
      const dayOfWeek = selectedDayOfWeek(day);

      const passingValues = {
        date: day.dateString,
        docId: docId,
        dayOfWeek: dayOfWeek,
      };
      navigation.navigate("DayScreen", {
        navigation: navigation,
        values: passingValues,
      });
    } else {
      setDisabledDate(day.dateString);
      setSelectedDate(null);
      Alert.alert(
        "Doctor is not available on this date",
        "There is no available time for this date",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
    }
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

  const isDayEnabled = (day) => {
    const Day = new Date(day.dateString).getDay();
    return filteredDayNumbers.includes(Day);
  };

  const selectedDayOfWeek = (day) => {
    const dayIndex = new Date(day.dateString).getDay();
    const dayAbbreviation = Object.keys(dayNumberMap).find(
      (key) => dayNumberMap[key] === dayIndex
    );
    return daysOfWeek.find((dayObj) => dayObj.day === dayAbbreviation);
  };

  return (
    <Calendar
      markingType={"custom"}
      minDate={today.toISOString().split("T")[0]}
      markedDates={markedDates}
      theme={theme}
      hideExtraDays={true}
      showSixWeeks={true}
      onDayPress={onDayPress}
      disabledDates={disabledDate ? { [disabledDate]: {} } : {}}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
