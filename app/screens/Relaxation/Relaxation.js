import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Card from "../../components/Card";

const CardArray = (props) => [
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Discussion"),
  },
];

const textArray = ["a", "b", "c", "d", "e"];

const Relaxation = (props) => {
  const [scroll, setScroll] = useState(false);
  return (
    <ScreenTemplate>
      <View style={styles.headerView}>
        <Text style={styles.mainText}>How are you feeling today?</Text>
        <Text style={styles.secondaryText}>
          Tell us and we'll suggest a sound!
        </Text>
      </View>
      <View style={styles.cardGrid}>
        <FlatList
          data={CardArray(props)}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              imageName={item.imageName}
              title={item.title}
              onPress={item.onPress}
            />
          )}
        />
      </View>
      <View style={styles.showMore}>
        <TouchableOpacity>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

export default Relaxation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-around",
  },
  headerView: {
    flex: 0.2,
    backgroundColor: "#f2eff2",
    borderRadius: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryText: {
    marginTop: 10,
  },
  cardGrid: {
    flex: 1,
    margin: 20,
  },
  showMore: {
    flex: 0.15,
    alignItems: "center",
  },
  showMoreText: {
    color: "white",
  },
});
