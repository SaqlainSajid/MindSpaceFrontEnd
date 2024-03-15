import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import Button from "../../../components/Button";
import AuthContext from "../../../auth/context";
import bookingsApi from "../../../api/bookingsApi";

const Bookings = (props) => {
  const [Bookings, setBookings] = useState([]);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Call the API to fetch bookings with docId and userId
      const response = await bookingsApi.getDoctorBookings(
        authContext.user._id
      );
      setBookings(response.data); // Update state with fetched bookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const handlePress = () => {
    props.navigation.navigate("BookingSettings");
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
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.topText}>Upcoming Bookings</Text>
        </View>
        <ScrollView style={styles.listContainer}>
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
        <View style={styles.footer}>
          <Button
            class="primary"
            text="Booking Settings"
            onPress={handlePress}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topView: {
    flex: 0.1,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  footer: {
    marginBottom: 20,
  },
});
