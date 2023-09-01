import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import CardGrid from "../../components/CardGrid";
import CardRow from "../../components/CardRow";
import Card from "../../components/Card";

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
        <View style={styles.sort}>
          <TouchableOpacity>
            <Text style={styles.sortText}>Sort By</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sortText}>Frequently Viewed</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <CardGrid>
            <CardRow>
              <Card
                title={"Press me to go to Discussion"}
                onPress={() => props.navigation.navigate("Discussion")}
              />
              <Card
                title="Press me to go to Relaxation"
                onPress={() => props.navigation.navigate("Relaxation")}
              ></Card>
            </CardRow>
            <CardRow>
              <Card
                title="Press me to go to Book Session"
                onPress={() => props.navigation.navigate("Book Session")}
              ></Card>
              <Card
                title="Press me to go to Vent"
                onPress={() => props.navigation.navigate("Vent")}
              ></Card>
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
  sort: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  sortText: {
    color: "white",
  },
  cardContainer: {
    flex: 1,
  },
});
