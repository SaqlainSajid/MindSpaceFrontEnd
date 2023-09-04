import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import CardGrid from "../../components/CardGrid";
import CardRow from "../../components/CardRow";
import Card from "../../components/Card";

export const imagePaths = {
  yoga: require("../../assets/YogaOriginal.png"),
  vent: require("../../assets/Vent.png"),
  booksession: require("../../assets/BookSession.png"),
  discussion: require("../../assets/Discussion.png"),
};

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
          <CardGrid>
            <CardRow>
              <Card
                imageName="yoga"
                title={"Start your day with calmness"}
                onPress={() => props.navigation.navigate("Relaxation")}
              />
              <Card
                imageName="discussion"
                title="See what's buzzing in the forum"
                onPress={() => props.navigation.navigate("Discussion")}
              ></Card>
            </CardRow>
            <CardRow>
              <Card
                imageName="booksession"
                title="Book a session with a professional"
                onPress={() => props.navigation.navigate("Book Session")}
              />
              <Card
                imageName="vent"
                title="Something on your mind?"
                onPress={() => props.navigation.navigate("Vent")}
              />
            </CardRow>
          </CardGrid>
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
  },
});
