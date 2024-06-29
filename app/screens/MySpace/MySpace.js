import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Card from "../../components/Card";
import ItemSeparator from "../../components/ItemSeparator";
import AuthContext from "../../auth/context";

const CardArrayUser = (props) => [
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

const CardArrayDoc = (props) => [
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
    title: "Check your Bookings",
    onPress: () => props.navigation.navigate("Bookings"),
  },
  {
    id: 4,
    imageName: "vent",
    title: "Something on your mind?",
    onPress: () => props.navigation.navigate("Vent"),
  },
];

const MySpace = (props) => {
  const authContext = useContext(AuthContext);
  const subscribed = authContext.user.subscribed;
  return (
    <ScreenTemplate>
      <View style={styles.main}>
        <View style={styles.resumeView}>
          <Text style={styles.mainText}>What would you like to do today?</Text>
        </View>
        <View style={styles.cardContainer}>
          {authContext.user.role == "user" ? (
            <FlatList
              data={CardArrayUser(props)}
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
          ) : (
            <FlatList
              data={CardArrayDoc(props)}
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
          )}
        </View>
      </View>
      {!subscribed && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate("Settings")}
        >
          <Text style={{ color: "#7ed957", fontWeight: 500 }}>
            TRY PREMIUM TODAY
          </Text>
        </TouchableOpacity>
      )}
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
    flex: 0.4,//changed 0.3 to 0.4
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
  btn: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 30,
    height: 50,
    borderColor: "white",
    backgroundColor: "white",
  },
});
