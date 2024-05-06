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
  Modal,
  Image,
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
  const userEmail = authContext.user.email;
  const userGender = authContext.user.gender;
  const { docId, date, price } = route.params;
  const [docName, setDocName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    name: yup.string().required("Name is required"),
    age: yup
      .number()
      .required("Age is required")
      .positive("Age must be a positive number"),
    gender: yup.string().required("Gender is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup
      .number()
      .required("Phone number is required")
      .integer("Phone number must be a number")
      .positive("Phone number must be a positive number")
      .test(
        "len",
        "Phone number must be exactly 11 digits",
        (val) => val && val.toString().length === 11
      ),
    emergencyContact: yup
      .number()
      .required("Emergency contact is required")
      .integer("Emergency contact must be a number")
      .positive("Emergency number must be a positive number")
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
        patientGender: values.gender,
        emergencyContact: values.emergencyContact,
        email: values.email,
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
        setShowConfirmation(true);
      } else if (response.status == 400) {
        console.error("Booking already exists:", response.data.message);
      } else {
        console.error("Error creating booking:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false); // Hide confirmation modal
    navigation.navigate("My Space"); // Navigate back to the home screen
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
            <Text style={styles.payText}>Client Details</Text>
            <Formik
              initialValues={{
                name: patientName ? patientName : "",
                age: userAge ? userAge.toString() : "",
                gender: userGender ? userGender : "Female",
                email: userEmail ? userEmail : "",
                phoneNumber: userPhoneNum ? userPhoneNum.toString() : "",
                emergencyContact: "",
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
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                      style={[
                        styles.input,
                        patientName ? styles.disabled : null,
                      ]}
                      placeholder="Name"
                      keyboardType="numeric"
                      onChangeText={formikProps.handleChange("name")}
                      onBlur={formikProps.handleBlur("name")}
                      value={formikProps.values.name}
                      editable={!patientName}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.name && formikProps.errors.name}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Age:</Text>
                    <TextInput
                      style={[styles.input, userAge ? styles.disabled : null]}
                      placeholder="Age"
                      onChangeText={formikProps.handleChange("age")}
                      onBlur={formikProps.handleBlur("age")}
                      value={formikProps.values.age}
                      editable={!userAge}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.age && formikProps.errors.age}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gender:</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() =>
                          formikProps.setFieldValue("gender", "Male")
                        }
                      >
                        <Text>Male</Text>
                        {formikProps.values.gender === "Male" && (
                          <View style={styles.radioButtonIndicator} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() =>
                          formikProps.setFieldValue("gender", "Female")
                        }
                      >
                        <Text>Female</Text>
                        {formikProps.values.gender === "Female" && (
                          <View style={styles.radioButtonIndicator} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() =>
                          formikProps.setFieldValue("gender", "Other")
                        }
                      >
                        <Text>Other</Text>
                        {formikProps.values.gender === "Other" && (
                          <View style={styles.radioButtonIndicator} />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.error}>
                      {formikProps.touched.gender && formikProps.errors.gender}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                      style={[styles.input, userEmail ? styles.disabled : null]}
                      placeholder="Email"
                      onChangeText={formikProps.handleChange("email")}
                      onBlur={formikProps.handleBlur("email")}
                      value={formikProps.values.email}
                      editable={!userEmail}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.email && formikProps.errors.email}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                      style={[
                        styles.input,
                        userPhoneNum ? styles.disabled : null,
                      ]}
                      placeholder="Phone Number"
                      keyboardType="numeric"
                      onChangeText={formikProps.handleChange("phoneNumber")}
                      onBlur={formikProps.handleBlur("phoneNumber")}
                      value={formikProps.values.phoneNumber}
                      editable={!userPhoneNum}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.phoneNumber &&
                        formikProps.errors.phoneNumber}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Emergency Contact Number:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Emergency Contact Number"
                      keyboardType="numeric"
                      onChangeText={formikProps.handleChange(
                        "emergencyContact"
                      )}
                      onBlur={formikProps.handleBlur("emergencyContact")}
                      value={formikProps.values.emergencyContact}
                    />
                    <Text style={styles.error}>
                      {formikProps.touched.emergencyContact &&
                        formikProps.errors.emergencyContact}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                      What brings you to seek help?:
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="What brings you to seek help?"
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
                      Please send {price}BDT to 01730722969 via Bkash Last 4
                      digits of Payment Number:
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
      <Modal visible={showConfirmation} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              style={{ height: 150, width: 150 }}
              source={require("../../assets/confirmIcon.png")}
            />
            <Text style={styles.modalText}>
              Your booking request has been received!
            </Text>
            <Text style={styles.modalText}>Thank You!</Text>
            <Button title="Close" onPress={handleConfirmationClose} />
          </View>
        </View>
      </Modal>
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
  payText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
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
  disabled: {
    backgroundColor: "lightgray",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginTop: 10,
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
  },
  radioButtonIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "purple",
    marginLeft: 5,
  },
});
