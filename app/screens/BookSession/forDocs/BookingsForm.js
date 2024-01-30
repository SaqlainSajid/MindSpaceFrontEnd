import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import doctorsApi from "../../../api/doctorsApi";
import AuthContext from "../../../auth/context";

const BookingForm = (props) => {
  const authContext = useContext(AuthContext);

  const handleSubmit = async (values) => {
    const structuredData = {
      duration: parseInt(values.duration, 10),
      price: parseInt(values.price, 10),
      bookSet: true,
      daysOfWeek: Object.keys(values.timeByDay).map((day) => ({
        day,
        timeFrom: values.timeByDay[day].from,
        timeTo: values.timeByDay[day].to,
      })),
    };

    try {
      const response = await doctorsApi.changeBookingSettings(
        authContext.user._id,
        structuredData
      );

      if (response.status === 200) {
        console.log("settings changed:", response.data);
      } else {
        console.error(
          "Error changing settings, not 200:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error changing settings, try failed:", error);
    }

    props.nav.goBack();
  };

  const handleToggleDay = (selectedDays, day, setFieldValue) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setFieldValue("selectedDays", updatedDays);
  };

  return (
    <Formik
      initialValues={{
        duration: "",
        price: "",
        selectedDays: [],
        timeByDay: {
          M: { from: "", to: "" },
          T: { from: "", to: "" },
          W: { from: "", to: "" },
          TH: { from: "", to: "" },
          F: { from: "", to: "" },
          ST: { from: "", to: "" },
          S: { from: "", to: "" },
        },
      }}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <View>
          <Text>What's the duration of each meeting?</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={handleChange("duration")}
            value={values.duration}
          />

          <Text>What's the price of each meeting?</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={handleChange("price")}
            value={values.price}
          />

          <Text>Which days will you be taking bookings on?</Text>
          {["M", "T", "W", "TH", "F", "ST", "S"].map((day) => (
            <View key={day}>
              <TouchableOpacity
                onPress={() =>
                  handleToggleDay(values.selectedDays, day, setFieldValue)
                }
              >
                <Text>{day}</Text>
              </TouchableOpacity>
              {values.selectedDays.includes(day) && (
                <View>
                  <Text>{`On ${day}, what time would you like to take appointments?`}</Text>
                  <TextInput
                    placeholder="From"
                    onChangeText={handleChange(`timeByDay.${day}.from`)}
                    value={values.timeByDay[day].from}
                  />
                  <TextInput
                    placeholder="To"
                    onChangeText={handleChange(`timeByDay.${day}.to`)}
                    value={values.timeByDay[day].to}
                  />
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={handleSubmit}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default BookingForm;
