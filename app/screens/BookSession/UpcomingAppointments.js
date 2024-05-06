import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Tab = createMaterialTopTabNavigator();

const ConfirmedScreen = () => (
  <ScreenTemplate>
    <View style={styles.container}>
      <Text>Confirmed</Text>
    </View>
  </ScreenTemplate>
);

const PendingScreen = () => (
  <ScreenTemplate>
    <View style={styles.container}>
      <Text>Pending</Text>
    </View>
  </ScreenTemplate>
);

const PreviousScreen = () => (
  <ScreenTemplate>
    <View style={styles.container}>
      <Text>Previous</Text>
    </View>
  </ScreenTemplate>
);

const UpcomingAppointments = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Confirmed" component={ConfirmedScreen} />
      <Tab.Screen name="Pending" component={PendingScreen} />
      <Tab.Screen name="Previous" component={PreviousScreen} />
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
