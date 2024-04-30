import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const DoctorCalendar = () => {
  const navigation = useNavigation();
  const today = new Date();
  const todayInUTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  today.setUTCHours(0, 0, 0, 0);

  const onDayPress = (day) => {
    const dateString = day.dateString;
    navigation.navigate("DayScreen", { selectedDateString: dateString });
  };

  return (
    <View>
      <Calendar
        minDate={todayInUTC.toISOString().split("T")[0]}
        onDayPress={onDayPress}
      />
    </View>
  );
};

export default DoctorCalendar;

const styles = StyleSheet.create({});
