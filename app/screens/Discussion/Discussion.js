import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Hashtag from "./Hashtag";
import ItemSeparator from "../../components/ItemSeparator";
import { Ionicons } from "react-native-vector-icons";
import { CardArray } from "../../components/FakeData";
import postsApi from "../../api/postsApi";
import filter from "lodash.filter";

const Discussion = (props) => {
  const [topicsData, setTopicsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  //this is run only the first time the screen loads
  useEffect(() => {
    setIsLoading(true);
    loadTopics();
  }, []);

  //gets all the topics from the database
  const loadTopics = async () => {
    const response = await postsApi.getTopics();
    setFilteredData(response.data);
    setTopicsData(response.data);
    setIsLoading(false);
  };

  //if we're fetching data, we show the loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  //Searching Topics
  const handleSearch = (query) => {
    setSearchInput(query);
    const formattedQuery = query.toLowerCase();
    const filtered = filter(topicsData, (topic) => {
      return contains(topic, formattedQuery);
    });
    setFilteredData(filtered);
  };

  const contains = (topic, query) => {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes(query)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.searchView}>
        <Ionicons name="search" size={24} />
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Search for a topic..."
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("AddPost")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardGrid}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              style={
                index % 2 === 0
                  ? {
                      flex: 1,
                      paddingRight: 10,
                    }
                  : {
                      flex: 1,
                    }
              }
            >
              <Hashtag title={item} navigation={props.navigation} />
            </View>
          )}
          ItemSeparatorComponent={ItemSeparator}
          style={{ borderRadius: 20 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenTemplate>
  );
};

export default Discussion;

const styles = StyleSheet.create({
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
  buttonText: {
    fontSize: 24,
    lineHeight: 24,
  },
  cardGrid: {
    flex: 1,
    margin: 20,
  },
  showMore: {
    flex: 0.15,
    alignItems: "center",
  },
  showLess: {
    flex: 0,
    alignItems: "center",
  },
  showText: {
    color: "white",
    paddingBottom: 10,
  },
  flatlist: {
    borderRadius: 20,
  },
});
