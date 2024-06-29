import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const HandleLogOut = () => {
    authContext.setUser(null);
    authStorage.removeToken();
  };
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.pic}
            source={require("../../assets/mountain.jpg")}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.name}>{authContext.user.name}</Text>
          <Text style={styles.role}>{authContext.user.role}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailTitle}>Gender</Text>
          <Text style={styles.detailText}>Male</Text>

          <Text style={styles.detailTitle}>Date of Birth</Text>
          <Text style={styles.detailText}>1.01.2023</Text>

          <Text style={styles.detailTitle}>Profession</Text>
          <Text style={styles.detailText}>{authContext.user.role}</Text>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} text="Edit Profile" class="primary" />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.logout}
              text="Logout"
              class="danger"
              onPress={HandleLogOut}
            />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 25,
  },
  pic: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  role: {
    fontSize: 18,
    color: "gray",
  },
  details: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    padding: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
