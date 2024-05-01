import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import { WebView } from "react-native-webview";

const PaymentScreen = ({ navigation, route }) => {
  const authContext = useContext(AuthContext);
  const userId = authContext.user._id;
  const { docId, date } = route.params;
  return (
    <ScreenTemplate>
      <WebView source={{ uri: "https://www.google.com" }} />
    </ScreenTemplate>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
