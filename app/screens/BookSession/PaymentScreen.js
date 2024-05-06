import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import { Formik } from "formik";
import * as yup from "yup";
import bookingsApi from "../../api/bookingsApi";
import doctorsApi from "../../api/doctorsApi";

const PaymentScreen = ({ navigation, route }) => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user._id;
  const userAge = authContext.user.age;
  const userPhoneNum = authContext.user.phoneNum;
  const patientName = authContext.user.name;
  const user = authContext.user;
  const { docId, date, price } = route.params;
  const [docName, setDocName] = useState("");

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    const response = await doctorsApi.getDoctor(docId);
    if (response.data) {
      setDocName(response.data.name);
    }
  };

  const validationSchema = yup.object().shape({
    age: yup
      .number()
      .required("Age is required")
      .positive("Age must be a positive number"),
    phoneNumber: yup
      .number()
      .required("Phone number is required")
      .integer("Phone number must be an integer")
      .positive("Phone number must be a positive number")
      .test(
        "len",
        "Phone number must be exactly 11 digits",
        (val) => val && val.toString().length === 11
      ),
    concern: yup.string().required("Concern is required"),
    paymentNumber: yup
      .string()
      .required("Payment number is required")
      .matches(/^\d{4}$/, "Payment number must be 4 digits"),
    transactionId: yup
      .string()
      .required("Transaction ID is required")
      .length(10, "Transaction ID must be exactly 10 characters"),
  });

  const handleSubmit = async (values) => {
    // Handle form submission here

    try {
      const booking = {
        date: date,
        docId: docId,
        userId: userId,
        docName: docName,
        patientName: patientName,
        patientAge: values.age,
        phoneNumber: values.phoneNumber,
        concern: values.concern,
        paymentNumber4digits: values.paymentNumber,
        transactionId: values.transactionId,
        price: price,
      };
      console.log("Form submitted with values:", booking);
      const response = await bookingsApi.setBooking(booking);
      if (response.status === 201) {
        console.log("Booking created:", response.data);
      } else if (response.status == 400) {
        console.error("Booking already exists:", response.data.message);
      } else {
        console.error("Error creating booking:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
    }
  };

  return (
    <ScreenTemplate>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <ScrollView>
          <View style={styles.main}>
            <Formik
              initialValues={{
                age: userAge ? userAge.toString() : "",
                phoneNumber: userPhoneNum ? userPhoneNum.toString() : "",
                concern: "",
                paymentNumber: "",
                transactionId: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(formikProps) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Age:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Age"
                      keyboardType="numeric"
                      onChangeText={formikProps.handleChange("age")}
                      onBlur={formikProps.handleBlur("age")}
                      value={formikProps.values.age}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.age && formikProps.errors.age}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      keyboardType="numeric"
                      onChangeText={formikProps.handleChange("phoneNumber")}
                      onBlur={formikProps.handleBlur("phoneNumber")}
                      value={formikProps.values.phoneNumber}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.phoneNumber &&
                        formikProps.errors.phoneNumber}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Concern:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Concern"
                      onChangeText={formikProps.handleChange("concern")}
                      onBlur={formikProps.handleBlur("concern")}
                      value={formikProps.values.concern}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.concern &&
                        formikProps.errors.concern}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                      Last 4 digits of Payment Number:
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Last 4 digits of Payment Number"
                      keyboardType="numeric"
                      onChangeText={formikProps.handleChange("paymentNumber")}
                      onBlur={formikProps.handleBlur("paymentNumber")}
                      value={formikProps.values.paymentNumber}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.paymentNumber &&
                        formikProps.errors.paymentNumber}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>BKash Transaction ID:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Transaction ID"
                      onChangeText={formikProps.handleChange("transactionId")}
                      onBlur={formikProps.handleBlur("transactionId")}
                      value={formikProps.values.transactionId}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.transactionId &&
                        formikProps.errors.transactionId}
                    </Text>
                  </View>
                  {formikProps.isValid ? (
                    <TouchableOpacity
                      style={styles.btnValid}
                      onPress={formikProps.handleSubmit}
                      disabled={!formikProps.isValid}
                    >
                      <Text style={{ color: "white" }}>Submit</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={formikProps.handleSubmit}
                      disabled={!formikProps.isValid}
                    >
                      <Text style={{ color: "white" }}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 25,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  avoid: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  btnValid: {
    backgroundColor: "purple",
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "lightgrey",
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
