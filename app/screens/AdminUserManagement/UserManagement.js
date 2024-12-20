import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "react-native-vector-icons";
import ScreenTemplate from "../../components/ScreenTemplate";
import { getAllUsers } from "../../api/usersApi"; // Removed DeleteUser as it will be handled in UserDetails.js
import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";
import UserProfile from "./Profile";

const UserManagement = (props) => {
  const [usersData, setUsersData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    loadUsers();
  }, []);

  // Function to handle search
  const handleSearch = (query) => {
    setSearchInput(query);
    const formattedQuery = query.toLowerCase();
    const filtered = filter(usersData, (user) => {
      return contains(user, formattedQuery);
    });
    setFilteredData(filtered);
  };

  // Function to check if the user's name includes the search query
  const contains = ({ name }, query) => {
    if (!name) {
      console.log("No name field found in user data:", { name });
      return false;
    }
    const lowerName = name.toLowerCase();
    return lowerName.includes(query);
  };

  // Function to load users from API
  const loadUsers = async () => {
    try {
      console.log("Fetching users from API...");
      const response = await getAllUsers(); 
      if (response && response.data) {
        setUsersData(response.data);
        setFilteredData(response.data);
      } else {
        console.log("No data found in API response.");
        setUsersData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading indicator while data is being fetched
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    <ScreenTemplate>
      <View style={styles.searchView}>
        <Ionicons name="search" size={24} />
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Search for a user..."
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.container}>
        {filteredData.length === 0 ? (
          <Text style={styles.noUsersText}>No users found.</Text> 
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View style={styles.userCard}>
                  <TouchableOpacity
                    style={styles.profileInfo}
                    onPress={() =>
                      navigation.navigate("UserDetails", { userId: item._id })
                    }
                  >
                    <UserProfile
                      pic={require("../../assets/mountain.jpg")}
                      name={item.name || "Unknown"}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            ItemSeparatorComponent={<View style={{ height: 10 }} />}
            scrollEnabled={true}
          />
        )}
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  userCard: {
    flexDirection: "column", 
    backgroundColor: "#fff",
    padding: 10, 
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: 15,
  },
  profileInfo: {
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 12, 
  },
  pic: {
    width: 60, 
    height: 60, 
    borderRadius: 25,
    marginRight: 12,
  },
  nameContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16, 
  },
  noUsersText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default UserManagement;
