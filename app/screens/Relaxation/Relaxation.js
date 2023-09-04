import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Card from "../../components/Card";
import ItemSeparator from "../../components/ItemSeparator";

const CardArray = (props) => [
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
  {
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Audio"),
  },
];

const textArray = ["a", "b", "c", "d", "e"];

const Relaxation = (props) => {
  const [scroll, setScroll] = useState(false);
  const flatListRef = useRef(null);
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
          ref={flatListRef}
          data={CardArray(props)}
          keyExtractor={(item) => item.title}
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
          style={scroll ? { borderRadius: 0 } : { borderRadius: 20 }}
          scrollEnabled={scroll}
        />
      </View>
      <View style={scroll ? styles.showLess : styles.showMore}>
        <TouchableOpacity
          onPress={() => {
            if (scroll) {
              flatListRef.current.scrollToOffset({ offset: 0, animated: true });
              setScroll(false);
            } else {
              setScroll(true);
            }
          }}
        >
          {scroll ? (
            <Text style={styles.showText}>Show Less</Text>
          ) : (
            <Text style={styles.showText}>Show More</Text>
          )}
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
