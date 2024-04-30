import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";

const PaymentScreen = ({ navigation, route }) => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user._id;
  const { docId, date } = route.params;
  return <ScreenTemplate></ScreenTemplate>;
};

export default PaymentScreen;

const styles = StyleSheet.create({});
