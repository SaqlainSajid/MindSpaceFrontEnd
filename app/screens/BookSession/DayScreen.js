import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import bookingsApi from "../../api/bookingsApi";
import AuthContext from "../../auth/context";

const DayScreen = () => {
  const route = useRoute();
  const { values, navigation } = route.params;
  const [bookings, setBookings] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [docTimeFrom, setDocTimeFrom] = useState(values.dayOfWeek.timeFrom);
  const [docTimeTo, setDocTimeTo] = useState(values.dayOfWeek.timeTo);
  const date = values.date;
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
    setDocTimeFrom(parseTime(docTimeFrom));
    setDocTimeTo(parseTime(docTimeTo));
  }, []);

  useEffect(() => {
    if (docTimeFrom && docTimeTo && date) {
      generateTimeSlots(docTimeFrom, docTimeTo, date);
    }
  }, [docTimeFrom, docTimeTo, date]);

  useFocusEffect(() => {
    fetchBookings(); // Fetch bookings every time the screen gains focus
  });

  //convert "9:00AM" to "09:00:00"
  const parseTime = (timeString) => {
    // Split the time string into hours, minutes, and AM/PM parts
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map((part) => parseInt(part));

    // Adjust hours for AM/PM
    let parsedHours = hours;
    if (period === "PM" && hours !== 12) {
      parsedHours += 12;
    } else if (period === "AM" && hours === 12) {
      parsedHours = 0;
    }
    // Format hours, minutes, and seconds to ensure leading zeros
    const formattedHours = parsedHours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Construct the formatted time string
    return `${formattedHours}:${formattedMinutes}:00`;
  };

  //an array of timeslots
  const generateTimeSlots = (docTimeFrom, docTimeTo, date) => {
    const docFrom = new Date(`${date}T${docTimeFrom}Z`);
    const docTo = new Date(`${date}T${docTimeTo}Z`);
    const tempSlots = [];
    for (
      let time = docFrom.getTime();
      time < docTo.getTime();
      time += 60 * 60 * 1000
    ) {
      const startDateTime = new Date(time);
      const endDateTime = new Date(time + 60 * 60 * 1000);
      tempSlots.push({
        timeFrom: startDateTime,
        timeTo: endDateTime,
      });
    }
    setTimeSlots(tempSlots);
  };

  const fetchBookings = async () => {
    try {
      // Call the API to fetch bookings with docId and userId
      const response = await bookingsApi.getBookings(values.docId, values.date);
      setBookings(response.data); // Update state with fetched bookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Function to format date in the desired format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to format time in the desired format
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <ScreenTemplate>
      <Text>{formatDate(date)}</Text>
      <Text>{values.dayOfWeek.timeFrom}</Text>
      <Text>{docTimeTo}</Text>
      <ScrollView>
        {timeSlots.map((timeSlot, index) => {
          // Check if there are any bookings for this time slot
          const hasBooking = bookings.some(
            (booking) =>
              new Date(booking.timeFrom).getTime() ===
              timeSlot.timeFrom.getTime()
          );

          // Render the time slot only if there are no bookings
          if (!hasBooking) {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "lightblue",
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("PaymentScreen", {
                    navigation: navigation,
                    values: {
                      userId: authContext.user._id,
                      docId: values.docId,
                      date: date,
                      timeFrom: timeSlot.timeFrom,
                      timeTo: timeSlot.timeTo,
                    },
                  })
                }
              >
                <Text>Slot {index + 1}</Text>
                {/* Format timeFrom using toISOString() */}
                <Text>{formatTime(timeSlot.timeFrom.toISOString())}</Text>
              </TouchableOpacity>
            );
          }

          return null; // Skip rendering if there are bookings
        })}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default DayScreen;

const styles = StyleSheet.create({});
