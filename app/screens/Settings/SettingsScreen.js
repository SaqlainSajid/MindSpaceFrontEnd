import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import Button from "../../components/Button";

const SettingsScreen = (props) => {
  const authContext = useContext(AuthContext);
  const handlePress = () => {
    props.navigation.navigate("BookingSettings");
  };
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {authContext.user.role == "doctor" ? (
          <Button
            class="primary"
            text="Booking Settings"
            onPress={handlePress}
          />
        ) : null}
        <Text>Settings</Text>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
});
