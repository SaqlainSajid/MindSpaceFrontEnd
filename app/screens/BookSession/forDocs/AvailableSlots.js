import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import doctorsApi from "../../../api/doctorsApi";
import bookingsApi from "../../../api/bookingsApi";
import ScreenTemplate from "../../../components/ScreenTemplate";
import { useNavigation } from "@react-navigation/native";

const AvailableSlots = ({ route }) => {
  const { docId, price, sDate } = route.params;
  const [selectedDate, setSelectedDate] = useState(sDate);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [alreadyBookedSlots, setAlreadyBookedSlots] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDate) {
      getDocDateBookings(docId, selectedDate);
      // findAvailableSlots(docId, selectedDate.toISOString());
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      findAvailableSlots(docId, selectedDate);
    }
  }, [alreadyBookedSlots]);

  const getDocDateBookings = async (docId, date) => {
    try {
      const response = await bookingsApi.getDocDateBookings(docId, date);

      setAlreadyBookedSlots(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  const findAvailableSlots = async (docId, date) => {
    try {
      const response = await doctorsApi.getDocAvailability(docId, date);
      const AvailabilitySlots = [];
      response.data.map((item, index) => {
        const SlotDate = new Date(item);
        AvailabilitySlots[index] = SlotDate;
      });

      const filteredAvailabilitySlots = AvailabilitySlots.filter(
        (availDate) => {
          // Check if availDate does not match any date in AlreadyBooked
          return !alreadyBookedSlots.some((booking) => {
            // Convert availDate and booking date to Date objects for comparison
            const availDateObj = new Date(availDate);
            const bookingDateObj = new Date(booking.date);
            // Check if the ISO strings of availDate and booking date match
            return availDateObj.toISOString() === bookingDateObj.toISOString();
          });
        }
      );

      setAvailabilitySlots(filteredAvailabilitySlots);
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  const handleConfirm = (item) => {
    navigation.navigate("PaymentScreen", {
      navigation: navigation,
      docId: docId,
      price: price,
      date: item.toISOString(),
    });
  };

  return (
    <ScreenTemplate>
      <View style={{ flex: 1, margin: 5 }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            margin: 10,
            borderRadius: 20,
          }}
        >
          <Text style={styles.header}>
            Choose a Time for: {selectedDate.split("T")[0]}
          </Text>
        </View>
        <ScrollView style={{ marginBottom: 50 }}>
          <View style={styles.slotsContainer}>
            <View style={styles.slotsView}>
              {selectedDate && availabilitySlots.length > 0 ? (
                availabilitySlots.map((item, index) => (
                  <TouchableOpacity
                    style={styles.slot}
                    key={index}
                    onPress={() => handleConfirm(item)}
                  >
                    <Text style={{ color: "white", alignSelf: "center" }}>
                      {item.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text
                  style={{ fontWeight: 300, alignSelf: "center", fontSize: 22 }}
                >
                  Sorry there are no time slots available for this date, please
                  choose another date
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenTemplate>
  );
};

export default AvailableSlots;

const styles = StyleSheet.create({
  paycontainer: {
    flex: 0.2,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 40,
  },
  btnClicked: {
    backgroundColor: "#292c52",
    flex: 1,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 40,
    borderColor: "#292c52",
  },
  btnTxt: {
    color: "black",
  },
  btnTxtClicked: {
    color: "white",
  },
  btnpayment: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 30,
    height: 50,
    borderColor: "green",
  },
  slotsContainer: {
    flex: 0.5,
  },
  slotsView: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  slot: {
    padding: 10,
    backgroundColor: "#7ed957",
    margin: 5,
    borderRadius: 5,
  },
  durationcontainer: {
    flex: 0.15,
    marginVertical: 10,
  },
  timecontainer: {
    flex: 0.15,
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

// const [selectedDate, setSelectedDate] = useState(null);
// const [availabilitySlots, setAvailabilitySlots] = useState([]);
// const [alreadyBookedSlots, setAlreadyBookedSlots] = useState([]);
//   const today = new Date();
//   today.setUTCHours(0, 0, 0, 0);

// useEffect(() => {
//   if (selectedDate) {
//     getDocDateBookings(docId, selectedDate.toISOString());
//     // findAvailableSlots(docId, selectedDate.toISOString());
//   }
// }, [selectedDate]);

// useEffect(() => {
//   if (selectedDate) {
//     findAvailableSlots(docId, selectedDate.toISOString());
//   }
// }, [alreadyBookedSlots]);

// const handleDayPress = (date) => {
// //   Set the selected date when a day is pressed
//   const sDate = new Date(date.dateString);
//   sDate.setUTCHours(0, 0, 0, 0);
//   setSelectedDate(sDate);
// };

// const getDocDateBookings = async (docId, date) => {
//   try {
//     const response = await bookingsApi.getDocDateBookings(docId, date);

//     setAlreadyBookedSlots(response.data);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     throw error; // Re-throw the error to handle it in the calling code
//   }
// };

// const findAvailableSlots = async (docId, date) => {
//   try {
//     const response = await doctorsApi.getDocAvailability(docId, date);
//     const AvailabilitySlots = [];
//     response.data.map((item, index) => {
//       const SlotDate = new Date(item);
//       AvailabilitySlots[index] = SlotDate;
//     });

//     const filteredAvailabilitySlots = AvailabilitySlots.filter(
//       (availDate) => {
//         // Check if availDate does not match any date in AlreadyBooked
//         return !alreadyBookedSlots.some((booking) => {
//           // Convert availDate and booking date to Date objects for comparison
//           const availDateObj = new Date(availDate);
//           const bookingDateObj = new Date(booking.date);
//           // Check if the ISO strings of availDate and booking date match
//           return availDateObj.toISOString() === bookingDateObj.toISOString();
//         });
//       }
//     );

//     setAvailabilitySlots(filteredAvailabilitySlots);
//   } catch (error) {
//     console.error("Error fetching availability:", error);
//     throw error; // Re-throw the error to handle it in the calling code
//   }
// };

// const handleConfirm = (item) => {
//   navigation.navigate("PaymentScreen", {
//     navigation: navigation,
//     docId: docId,
//     date: item,
//   });
// };
