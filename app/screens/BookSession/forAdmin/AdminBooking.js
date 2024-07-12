import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AdminConfirmed from "./AdminConfirmed";
import AdminPending from "./AdminPending";
import AdminPrev from "./AdminPrev";

const Tab = createMaterialTopTabNavigator();

const AdminBooking = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Confirmed" component={AdminConfirmed} />
      <Tab.Screen name="Pending" component={AdminPending} />
      <Tab.Screen name="Previous" component={AdminPrev} />
    </Tab.Navigator>
  );
};

export default AdminBooking;
