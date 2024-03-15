import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ScreenTemplate from "../../../components/ScreenTemplate";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

const DayScreen = (props) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [edit, setEdit] = useState(false);

  const route = useRoute();
  const { selectedDateString } = route.params;

  const date = new Date(selectedDateString);
  date.setHours(0, 0, 0, 0);
  date.setUTCHours(2, 0, 0, 0);

  const slots = [];

  // Set the start and end hours for the time slots (8:00 AM to 8:00 PM)
  const startHour = 8;
  const endHour = 20;

  // Iterate over each hour to create time slots
  for (let hour = startHour; hour <= endHour; hour++) {
    // Create a new Date object for the current hour
    const slotDate = new Date(date);
    slotDate.setHours(hour, 0, 0, 0); // Set the hour for the slot

    // Push the slotDate object to the slots array
    slots.push(slotDate);
  }

  const handleSlotPress = (index) => {
    const slotIndex = selectedSlots.indexOf(index);
    if (slotIndex === -1) {
      // If the slot is not selected, add it to the selectedSlots array
      setSelectedSlots([...selectedSlots, index]);
    } else {
      // If the slot is already selected, remove it from the selectedSlots array
      const updatedSlots = [...selectedSlots];
      updatedSlots.splice(slotIndex, 1);
      setSelectedSlots(updatedSlots);
    }
  };

  const handleEdit = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
      const selectedTimes = selectedSlots.map((index) => slots[index]);
      // Here you can perform further actions with the selected dates, such as saving to database, etc.
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <ScrollView style={{ flex: 0.5 }}>
          {slots.map((item, index) => {
            const backgroundColor = selectedSlots.includes(index)
              ? "#7ed957" // Light green when selected
              : "white";
            const color = selectedSlots.includes(index) ? "white" : "black";
            return (
              <TouchableOpacity
                key={index}
                style={[styles.slot, { backgroundColor }]}
                onPress={() => handleSlotPress(index)}
                disabled={!edit}
              >
                <Text style={[styles.timeText, { color }]}>
                  {item.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={{ flex: 0.2, marginTop: 10 }}>
          {edit ? (
            <TouchableOpacity style={styles.buttonSave} onPress={handleEdit}>
              <Text
                style={{
                  color: "purple",
                  alignSelf: "center",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={{ color: "white", alignSelf: "center" }}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default DayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
  },
  slot: {
    padding: 10,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "#0a1145",
    borderRadius: 10,
    width: 100,
    marginTop: 5,
    alignSelf: "center",
  },
  buttonSave: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "purple",
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    marginTop: 5,
    alignSelf: "center",
  },
  timeText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: 500,
  },
});
