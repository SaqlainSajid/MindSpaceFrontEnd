import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import bookingsApi from "../../api/bookingsApi";

const Upcoming = () => {
  const [Bookings, setBookings] = useState([]);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Call the API to fetch bookings with docId and userId
      const response = await bookingsApi.getUserBookings(authContext.user._id);
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
      <ScrollView>
        {Bookings.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "lightblue",
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          >
            <Text>Date:{formatDate(item.date)}</Text>
            <Text>From:{formatTime(item.timeFrom)}</Text>
            <Text>To:{formatTime(item.timeTo)}</Text>
          </View>
        ))}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default Upcoming;

const styles = StyleSheet.create({});
