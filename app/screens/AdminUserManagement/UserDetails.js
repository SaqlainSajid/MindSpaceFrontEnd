import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getUser, DeleteUser } from "../../api/usersApi";
import notificationsApi from "../../api/notificationsApi";
import bookingsApi from "../../api/bookingsApi";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal state

  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const fetchUserDetails = async (id) => {
    try {
      const response = await getUser(id);
      if (response && response.data) {
        setUser(response.data);
      } else {
        Alert.alert("Error", "Failed to fetch user details.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      Alert.alert("Error", "Unable to fetch user data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setModalVisible(false); // Close the modal
    setIsDeleting(true);
    try {
      await notificationsApi.deleteAll(userId);
      await bookingsApi.deleteAll(userId);
      await DeleteUser(userId);
      Alert.alert("Success", "User and all related data deleted successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting user and related data:", error);
      Alert.alert("Error", "Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const renderUserInfo = () => {
    if (!user) return null;

    const userAttributes = [
      { label: "Email", value: user.email },
      { label: "Subscribed", value: user.subscribed ? "Yes" : "No" },
      { label: "Age", value: user.age || "N/A" },
      { label: "Gender", value: user.gender || "N/A" },
    ];

    if (user.role === "doctor") {
      userAttributes.push(
        { label: "Specialization", value: user.spec.join(", ") || "N/A" },
        {
          label: "Degrees",
          value:
            user.degrees && Array.isArray(user.degrees)
              ? user.degrees.map((degree, index) => (
                  <Text key={index}>
                    Name: {degree.name || "N/A"}, Major: {degree.major || "N/A"}, Institution:{" "}
                    {degree.institution || "N/A"}
                  </Text>
                ))
              : "N/A",
        }
      );
    }

    if (user.role === "volunteer") {
      userAttributes.push({ label: "Price", value: user.price || "N/A" });
    }

    const validAttributes = userAttributes.filter(
      (attr) => attr.value !== null && attr.value !== undefined
    );

    return (
      <View style={styles.userInfo}>
        {validAttributes.map((attr, index) => (
          <View key={index}>
            <Text style={styles.infoTitle}>{attr.label}:</Text>
            {Array.isArray(attr.value) ? (
              attr.value
            ) : (
              <Text style={styles.infoText}>{attr.value}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={styles.userProfile}>
          <Image
            style={styles.userImage}
            source={require("../../assets/mountain.jpg")}
          />
          <Text style={styles.userName}>{user.name || "Unknown"}</Text>
          <Text style={styles.userRole}>{user.role || "No role found"}</Text>
        </View>

        {renderUserInfo()}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setModalVisible(true)} // Show modal
          disabled={isDeleting}
        >
          <Text style={styles.deleteButtonText}>
            {isDeleting ? "Deleting..." : "Delete User"}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Delete</Text>
              <Text style={styles.modalText}>
                Are you sure you want to delete this user? This action cannot be undone.
              </Text>
              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.modalButton, styles.noButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.yesButton]}
                  onPress={handleDeleteUser}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  userProfile: { alignItems: "center", marginVertical: 20 },
  userImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  userName: { fontSize: 22, fontWeight: "bold" },
  userRole: { fontSize: 18, color: "gray", marginBottom: 20 },
  userInfo: { marginVertical: 20 },
  infoTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  infoText: { fontSize: 16, marginBottom: 15 },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: "center",
  },
  deleteButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  noButton: { backgroundColor: "#ccc" },
  yesButton: { backgroundColor: "#ff4d4d" },
  modalButtonText: { color: "white", fontWeight: "bold" },
});

export default UserDetails;
