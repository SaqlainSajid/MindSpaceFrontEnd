import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";

const Relaxation = () => {
  return (
    <ScreenTemplate>
      <View style={styles.headerView}>
        <Text style={styles.mainText}>How are you feeling today?</Text>
        <Text style={styles.secondaryText}>
          Tell us and we'll suggest a sound!
        </Text>
      </View>
      <View style={styles.cardGrid}></View>
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
  },
  showMore: {
    flex: 0.15,
    alignItems: "center",
  },
  showMoreText: {
    color: "white",
  },
});
