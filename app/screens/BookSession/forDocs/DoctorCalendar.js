import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const DoctorCalendar = () => {
  const navigation = useNavigation();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const onDayPress = (day) => {
    const dateString = day.dateString;
    navigation.navigate("DayScreen", { selectedDateString: dateString });
  };

  return (
    <View>
      <Calendar
        minDate={today.toISOString().split("T")[0]}
        onDayPress={onDayPress}
      />
    </View>
  );
};

export default DoctorCalendar;

const styles = StyleSheet.create({});
