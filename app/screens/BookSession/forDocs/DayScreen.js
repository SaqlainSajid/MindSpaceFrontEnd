import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ScreenTemplate from "../../../components/ScreenTemplate";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import doctorsApi from "../../../api/doctorsApi";
import AuthContext from "../../../auth/context";
import bookingsApi from "../../../api/bookingsApi";

const DayScreen = (props) => {
  const authContext = useContext(AuthContext);
  const docId = authContext.user._id;
  const [alreadyBookedSlots, setAlreadyBookedSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [edit, setEdit] = useState(false);

  const route = useRoute();
  const { selectedDateString } = route.params;

  useEffect(() => {
    const date = new Date(selectedDateString);
    date.setUTCHours(0, 0, 0, 0);

    getDocAvailability(docId, date.toISOString());
    getDocDateBookings(docId, selectedDateString);
  }, []);

  const getDocAvailability = async (docId, date) => {
    try {
      const response = await doctorsApi.getDocAvailability(docId, date);
      const selectedAvailabilitySlots = [];
      response.data.map((item, index) => {
        const selectedSlotDate = new Date(item);
        selectedAvailabilitySlots[index] = selectedSlotDate;
      });
      console.log("availability:", selectedAvailabilitySlots);
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  const getDocDateBookings = async (docId, date) => {
    try {
      const response = await bookingsApi.getDocDateBookings(docId, date);
      setAlreadyBookedSlots(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  const date = new Date(selectedDateString);
  // date.setUTCHours(2, 0, 0, 0);
  //UTC+2 gives Bangladesh time

  const slots = [];

  // Set the start and end hours for the time slots (8:00 AM to 8:00 PM)
  const startHour = 0;
  const endHour = 24;

  // Iterate over each hour to create time slots
  for (let hour = startHour; hour <= endHour; hour++) {
    // Create a new Date object for the current hour
    const slotDate = new Date(date);
    slotDate.setUTCHours(hour, 0, 0, 0); // Set the hour for the slot

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

  console.log("selected slots:", selectedSlots);

  const handleEdit = () => {
    if (edit) {
      setEdit(false);
      const availability = selectedSlots.map((index) =>
        slots[index].toISOString()
      );
      const data = { availability: availability };
      doctorsApi
        .setDocAvailability(docId, date.toISOString(), data)
        .then((response) => {
          console.log("Availability added successfully:", response);
          // Perform any further actions after availability is added successfully
        })
        .catch((error) => {
          console.error("Error adding availability:", error);
          // Handle errors appropriately
        });
    } else {
      setEdit(true);
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <ScrollView style={{ flex: 0.5 }}>
          {slots.map((item, index) => {
            const bookingForSlotDate = alreadyBookedSlots.find(
              (booking) =>
                new Date(booking.date).toISOString() ===
                new Date(item).toISOString()
            );
            let backgroundColor;

            backgroundColor = selectedSlots.includes(index)
              ? "#7ed957" // Light green when selected
              : "white";

            if (bookingForSlotDate) {
              backgroundColor = "#add8e6";
            }

            // Check if background color is light blue
            const disabled = backgroundColor === "#add8e6";
            const color = selectedSlots.includes(index) ? "white" : "black";
            return (
              <TouchableOpacity
                key={index}
                style={[styles.slot, { backgroundColor }]}
                onPress={() => handleSlotPress(index)}
                disabled={disabled || !edit}
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
