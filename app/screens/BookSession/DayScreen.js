import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useRoute } from "@react-navigation/native";
import bookingsApi from "../../api/bookingsApi";

const DayScreen = () => {
  const route = useRoute();
  const { values, navigation } = route.params;
  const [bookings, setBookings] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [docTimeFrom, setDocTimeFrom] = useState(values.dayOfWeek.timeFrom);
  const [docTimeTo, setDocTimeTo] = useState(values.dayOfWeek.timeTo);
  const date = values.date;

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

  return (
    <ScreenTemplate>
      <Text>{date}</Text>
      <Text>{docTimeFrom}</Text>
      <Text>{docTimeTo}</Text>
      <View>
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
                style={{ backgroundColor: "lightblue", marginBottom: 10 }}
              >
                <Text>Slot {index + 1}</Text>
                {/* Format timeFrom using toISOString() */}
                <Text>{timeSlot.timeFrom.toISOString()}</Text>
              </TouchableOpacity>
            );
          }

          return null; // Skip rendering if there are bookings
        })}
      </View>
    </ScreenTemplate>
  );
};

export default DayScreen;

const styles = StyleSheet.create({});
