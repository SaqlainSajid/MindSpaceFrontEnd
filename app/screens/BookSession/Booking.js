import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { Calendar } from "react-native-calendars";

import { useNavigation } from "@react-navigation/native";

const Booking = ({ route }) => {
  const { docId, price } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const navigation = useNavigation();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const handleDayPress = (date) => {
    // Set the selected date when a day is pressed
    const sDate = new Date(date.dateString);
    sDate.setUTCHours(0, 0, 0, 0);
    setSelectedDate(sDate);
  };

  const markedDates = {};
  if (selectedDate) {
    markedDates[selectedDate.toISOString().split("T")[0]] = {
      selected: true,
      selectedColor: "purple",
    };
  }

  const handleTransition = () => {
    if (selectedDate) {
      navigation.navigate("AvailableSlots", {
        docId: docId,
        sDate: selectedDate.toISOString(),
        price: price,
      });
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.header}>Choose a Date</Text>
        <View style={styles.calendarcontainer}>
          <Calendar
            minDate={today.toISOString().split("T")[0]}
            onDayPress={handleDayPress}
            showSixWeeks={true}
            markedDates={markedDates}
          />
        </View>
        {selectedDate ? (
          <TouchableOpacity
            style={styles.btnContinue}
            onPress={handleTransition}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScreenTemplate>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  calendarcontainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 80,
  },
  btnContinue: {
    padding: 15,
    backgroundColor: "purple",
    margin: 10,
    borderRadius: 15,
  },
});
