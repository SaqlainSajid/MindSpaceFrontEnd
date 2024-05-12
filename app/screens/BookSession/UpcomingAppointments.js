import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";

import PendingBookings from "./PendingBookings";
import ConfirmedBookings from "./ConfirmedBookings";
import PastBookings from "./PastBookings";

const Tab = createMaterialTopTabNavigator();

const UpcomingAppointments = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Confirmed" component={ConfirmedBookings} />
      <Tab.Screen name="Pending" component={PendingBookings} />
      <Tab.Screen name="Previous" component={PastBookings} />
    </Tab.Navigator>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
