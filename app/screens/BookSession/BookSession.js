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
import filter from "lodash.filter";

const BookSession = (props) => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    loadDoctors();
  }, []);

  const handleSearch = (query) => {
    setSearchInput(query);
    const formattedQuery = query.toLowerCase();
    const filtered = filter(doctorsData, (doctor) => {
      return contains(doctor, formattedQuery);
    });
    setFilteredData(filtered);
  };

  const contains = ({ name, price, spec }, query) => {
    const lowerName = name.toLowerCase();
    const stringPrice = price.toString();

    if (
      lowerName.includes(query) ||
      stringPrice.includes(query) ||
      spec.some((specItem) => specItem.toLowerCase().includes(query))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const loadDoctors = async () => {
    const response = await doctorsApi.getDoctors();
    if (response.data) {
      setDoctorsData(response.data);
      setFilteredData(response.data);
    } else {
      setDoctorsData([]);
      setFilteredData([]);
    }
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
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Search for a doctor..."
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button}>
          <Ionicons name="filter-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredData}
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
