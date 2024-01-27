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
import Profile from "./Profile";
import doctorsApi from "../../api/doctorsApi";

const BookSession = (props) => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const response = await doctorsApi.getDoctors();
    setDoctorsData(response.data);
    setIsLoading(false);
  };

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
        <TextInput style={styles.input} placeholder="Search for a doctor..." />
        <TouchableOpacity style={styles.button}>
          <Ionicons name="filter-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={doctorsData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Profile
              key={item._id}
              pic={require("../../assets/mountain.jpg")}
              name={item.name}
              degrees={item.degrees}
              spec={item.spec}
              price={item.price}
              duration={item.duration}
              navigation={props.navigation}
            />
          )}
          ItemSeparatorComponent={<View style={{ height: 10 }} />}
          scrollEnabled={true}
        />
      </View>
    </ScreenTemplate>
  );
};

export default BookSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 0.8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    height: "40%",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  button: {
    flex: 0.1,
    borderWidth: 1,
    borderRadius: 10,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
