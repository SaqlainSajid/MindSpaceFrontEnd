import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import Card from "../../components/Card";
import ItemSeparator from "../../components/ItemSeparator";
import { Ionicons } from "react-native-vector-icons";

const CardArray = (props) => [
  {
    id: 1,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 2,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 3,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 4,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 5,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 6,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 7,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 8,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 9,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 10,
    imageName: "yoga",
    title: "Start off the day with calmness",
    onPress: () => props.navigation.navigate("Feed"),
  },
];

const Discussion = (props) => {
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
          style={{ borderRadius: 20 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenTemplate>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-around",
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
  buttonText: {
    fontSize: 24,
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
