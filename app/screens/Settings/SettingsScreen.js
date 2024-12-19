import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";
import Button from "../../components/Button";
import authApi from "../../api/authApi";

const SettingsScreen = (props) => {
  const authContext = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePress = () => {
    props.navigation.navigate("BookingSettings");
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await authApi.changePassword(
        authContext.user._id,
        currentPassword,
        newPassword
      );
      
      if (result.ok) {
        Alert.alert("Success", "Password changed successfully");
        setShowPasswordForm(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Error", "Failed to change password. Please check your current password.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while changing password");
    }
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
        
        <Button
          class="primary"
          text={showPasswordForm ? "Cancel" : "Change Password"}
          onPress={() => setShowPasswordForm(!showPasswordForm)}
          style={styles.button}
        />

        {showPasswordForm && (
          <View style={styles.passwordForm}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Button
              class="primary"
              text="Submit"
              onPress={handleChangePassword}
              style={styles.button}
            />
          </View>
        )}
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
  passwordForm: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
