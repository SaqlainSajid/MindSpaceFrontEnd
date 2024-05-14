import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";

import PendingBookings from "../PendingBookings";
import ConfirmedBookings from "../ConfirmedBookings";
import BookingSettings from "./BookingSettings";

const Tab = createMaterialTopTabNavigator();

const Bookings = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Confirmed" component={ConfirmedBookings} />
      <Tab.Screen name="Pending" component={PendingBookings} />
      <Tab.Screen name="Settings" component={BookingSettings} />
    </Tab.Navigator>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import ScreenTemplate from "../../../components/ScreenTemplate";
// import Button from "../../../components/Button";
// import bookingsApi from "../../../api/bookingsApi";

// const Bookings = (props) => {
//   const [docBookings, setDocBookings] = useState([])
//   useEffect(()=>{
//     getUpcomingDocBookings()
//   },[])
//   const handlePress = () => {
//     props.navigation.navigate("BookingSettings");
//   };

//   const getUpcomingDocBookings = async (docId) => {
//     try {
//       const response = await bookingsApi.getUpcomingDocBookings(docId, date);
//       setAlreadyBookedSlots(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       throw error; // Re-throw the error to handle it in the calling code
//     }
//   };
//   return (
//     <ScreenTemplate>
//       <View style={styles.container}>
//         <View style={styles.topView}>
//           <Text style={styles.topText}>Upcoming Bookings</Text>
//         </View>
//         <View style={styles.listContainer}></View>
//         <View style={styles.footer}>
//           <Button class="primary" text="Booking Settings" />
//         </View>
//       </View>
//     </ScreenTemplate>
//   );
// };

// export default Bookings;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//   },
//   topView: {
//     flex: 0.1,
//     backgroundColor: "white",
//     borderRadius: 20,
//     marginHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 10,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   topText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   listContainer: {
//     flex: 1,
//     marginHorizontal: 20,
//     marginBottom: 10,
//     backgroundColor: "white",
//     borderRadius: 20,
//   },
//   footer: {
//     marginBottom: 20,
//   },
// });
