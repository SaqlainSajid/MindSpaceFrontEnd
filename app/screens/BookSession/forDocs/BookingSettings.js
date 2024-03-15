import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useCallback, useState } from "react";
import ScreenTemplate from "../../../components/ScreenTemplate";
import AuthContext from "../../../auth/context";
import Button from "../../../components/Button";
import BookingForm from "./BookingsForm";
import doctorsApi from "../../../api/doctorsApi";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { disableExpoCliLogging } from "expo/build/logs/Logs";
import DoctorCalendar from "./DoctorCalendar";

const BookingSettings = (props) => {
  const authContext = useContext(AuthContext);
  // const [days, setDays] = useState(authContext.user.daysOfWeek);
  // const [bookSet, setBookSet] = useState(authContext.user.bookSet);
  // const [isLoading, setIsLoading] = useState(false);
  // const [doctor, setDoctor] = useState({});

  // useFocusEffect(
  //   useCallback(() => {
  //     setIsLoading(true);
  //     loadDoctor();
  //   }, [])
  // );

  // const loadDoctor = async () => {
  //   const response = await doctorsApi.getDoctor(authContext.user._id);
  //   if (response.data) {
  //     setDoctor(response.data);
  //     setIsLoading(false);
  //     setDays(response.data.daysOfWeek);
  //     setBookSet(response.data.bookSet);
  //   } else {
  //     console.log("Error fetching Doctor");
  //   }
  // };

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#5500dc" />
  //     </View>
  //   );
  // }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {/* {bookSet ? (
          <View style={styles.textDetails}>
            <View>
              <Text>duration: {doctor.duration}</Text>
              <Text>price: {doctor.price}</Text>
            </View>
            <View>
              {days.map((day) => (
                <View key={day._id}>
                  <Text>Day: {day.day}</Text>
                  <Text>Start Time:{day.timeFrom}</Text>
                  <Text>End Time:{day.timeTo}</Text>
                </View>
              ))}
            </View>
            <View style={styles.footer}>
              <Button
                class="primary"
                text="Edit"
                onPress={() => setBookSet(false)}
              />
            </View>
          </View>
        ) : (
          <BookingForm nav={props.navigation} />
        )} */}
        <View style={styles.priceSetterContainer}>
          <View style={styles.priceSetterInner}>
            <Text style={{ fontSize: 18, fontWeight: 500 }}>price:</Text>
            <TextInput
              placeholder="Enter price for 1 hour meeting"
              style={styles.priceSetterTextInput}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", alignSelf: "center" }}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Availability:</Text>
          <DoctorCalendar />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default BookingSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  priceSetterContainer: {
    flex: 0.2,
    alignItems: "center",
  },
  priceSetterInner: {
    flex: 0.8,
    flexDirection: "row",
    alignItems: "center",
  },
  priceSetterTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginLeft: 5,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#0a1145",
    borderRadius: 10,
    width: 100,
  },
  calendarContainer: {
    flex: 0.5,
  },
});
