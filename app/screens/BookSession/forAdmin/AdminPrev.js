import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const AdminPrev=()=> {
  return (
    <ScreenTemplate>
        <View style={styles.main}>
            <Text style={styles.noBookings}>
              Previous Booking will be shown here</Text>
        </View>
    </ScreenTemplate>
  )
}

export default AdminPrev

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 10,
  },
  noBookings: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "500",
  },
});