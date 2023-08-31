import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import TopBar from "../../components/TopBar";

const Discussion = ({ navigation }) => {
  return (
    <ScreenTemplate>
      <View>
        <Text>Discussion</Text>
      </View>
    </ScreenTemplate>
  );
};

Discussion.navigationOptions = {
  header: () => <TopBar />,
};

export default Discussion;

const styles = StyleSheet.create({});
