import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Hashtag from "./Hashtag";
import ItemSeparator from "../../components/ItemSeparator";
import { Ionicons } from "react-native-vector-icons";
import { CardArray } from "../../components/FakeData";
import postsApi from "../../api/postsApi";

const Discussion = (props) => {
  const [topicsData, setTopicsData] = useState([]);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    const response = await postsApi.getTopics();
    setTopicsData(response.data);
  };
  return (
    <ScreenTemplate>
      <View style={styles.searchView}>
        <Ionicons name="search" size={24} />
        <TextInput style={styles.input} placeholder="Search for a topic..." />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("AddPost")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardGrid}>
        <FlatList
          data={topicsData}
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
