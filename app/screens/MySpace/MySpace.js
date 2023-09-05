import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Card from "../../components/Card";
import ItemSeparator from "../../components/ItemSeparator";

export const imagePaths = {
  yoga: require("../../assets/YogaOriginal.png"),
  vent: require("../../assets/Vent.png"),
  booksession: require("../../assets/BookSession.png"),
  discussion: require("../../assets/Discussion.png"),
};

const CardArray = (props) => [
  {
    id: 1,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Relaxation"),
  },
  {
    id: 2,
    imageName: "discussion",
    title: "See what's buzzing in the forum",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    id: 3,
    imageName: "booksession",
    title: "Book a session with a professional",
    onPress: () => props.navigation.navigate("Book Session"),
  },
  {
    id: 4,
    imageName: "vent",
    title: "Something on your mind?",
    onPress: () => props.navigation.navigate("Vent"),
  },
];

const MySpace = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <View style={styles.resumeView}>
          <Text style={styles.mainText}>What would you like to do today?</Text>
          <TouchableOpacity>
            <Text style={styles.resumeButtonText}>Start where you left...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            data={CardArray(props)}
            keyExtractor={(item) => item.id}
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
                <Card
                  imageName={item.imageName}
                  title={item.title}
                  onPress={item.onPress}
                />
              </View>
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
        <View style={{ flex: 0.1 }} />
      </View>
    </ScreenTemplate>
  );
};

export default MySpace;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-around",
  },
  resumeView: {
    flex: 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resumeButtonText: {
    color: "red",
  },
  sortText: {
    color: "white",
  },
  cardContainer: {
    flex: 1,
    margin: 20,
  },
});
