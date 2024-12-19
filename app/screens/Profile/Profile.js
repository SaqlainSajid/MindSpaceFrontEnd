import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";
import usersApi from "../../api/usersApi";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(authContext.user.profilePhoto || require("../../assets/mountain.jpg"));

  const HandleLogOut = () => {
    authContext.setUser(null);
    authStorage.removeToken();
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "You need to allow access to your photos to change profile picture.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        // Create form data for the image upload
        const formData = new FormData();
        formData.append('profilePhoto', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'profile-photo.jpg',
        });

        try {
          const response = await usersApi.uploadProfilePhoto(formData);

          if (response.ok) {
            setProfileImage({ uri: result.assets[0].uri });
            // Update the user context with new photo URL if needed
            authContext.setUser({
              ...authContext.user,
              profilePhoto: response.data.photoUrl
            });
          } else {
            Alert.alert('Error', 'Failed to upload profile photo. Please try again.');
          }
        } catch (error) {
          console.error('Upload error:', error);
          Alert.alert('Error', 'Failed to upload profile photo. Please try again.');
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.pic}
              source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </View>
          </View>
        </TouchableOpacity>
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
          {/* <View style={styles.buttonContainer}>
            <Button style={styles.button} text="Edit Profile" class="primary" />
          </View> */}
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
  },
  pic: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  logout: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
  },
});
