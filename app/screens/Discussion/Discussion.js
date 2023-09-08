import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import Hashtag from "../../components/Hashtag";
import ItemSeparator from "../../components/ItemSeparator";
import { Ionicons } from "react-native-vector-icons";

const CardArray = (props) => [
  {
    id: 1,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 1, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 2,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 3,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 4,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 5,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 6,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 7,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 8,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 9,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
    onPress: () => props.navigation.navigate("Feed"),
  },
  {
    id: 10,
    title: "#I am into men",
    posts: [
      { id: 1, username: "homer", post: "I love bananas" },
      { id: 2, username: "homie", post: "I love bananas too" },
      { id: 3, username: "holmes", post: "me too" },
      { id: 4, username: "beff", post: "I love bananas" },
      { id: 5, username: "jezzos", post: "I love bananas" },
    ],
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
              <Hashtag
                title={item.title}
                onPress={item.onPress}
                posts={item.posts}
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
