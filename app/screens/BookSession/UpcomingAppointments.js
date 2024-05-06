import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const UpcomingAppointments = () => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>yo</Text>
      </View>
    </ScreenTemplate>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
