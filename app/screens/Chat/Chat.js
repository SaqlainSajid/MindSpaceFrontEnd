import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import AuthContext from "../../auth/context";

subscribed = false;

const Chat = (props) => {
  const authContext = useContext(AuthContext);

  if (subscribed === false) {
    if (authContext.user.role === "user") {
      return (
        <ScreenTemplate>
          <View style={styles.main}>
            <View style={styles.headerview}>
              <Text style={styles.headerText}>Hey! How's it going? </Text>
              <Text style={styles.secondaryText}>
                no matter how you're feeling our dedicated volunteers are always
                here to guide you through it! give us a call or text!
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.headerText}>Chat with a volunteer</Text>
              <Text style={styles.secondaryText}>
                You can chat with one of our volunteers for free for 15 minutes!
              </Text>
              <Text style={styles.secondaryText}>
                If you are a subscribed member, you get unlimited chat time for
                just BDT 200/month!
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.navigate("ChatScreen")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.headerText}>Call a volunteer</Text>
              <Text style={styles.secondaryText}>
                You can talk with one of our volunteers for free for 15 minutes!
              </Text>
              <Text style={styles.secondaryText}>
                If you are a subscribed member, you get unlimited talk time for
                just BDT 200/month!
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.navigate("CallScreen")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScreenTemplate>
      );
    } else {
      return (
        <ScreenTemplate>
          <View style={styles.volunteerMain}>
            <Text style={styles.headerText}>Chat list</Text>
            <ScrollView style={styles.chatList}></ScrollView>

            {/* <View style={styles.headerview}>
              <Text style={styles.headerText}>Hey! How's it going? </Text>
              <Text style={styles.secondaryText}>
                Click on Chat/Call and we will connect you to a user
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.headerText}>Chat with a user</Text>
              <Text style={styles.secondaryText}>
                If a user is not subscribed, chat closes automatically after 15
                minutes, other wise it stays open for as long as the user wants
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.navigate("ChatScreen")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.headerText}>Take a call</Text>
              <Text style={styles.secondaryText}>
                If a user is not subscribed, call is disconnected automatically
                after 15 minutes, other wise it stays connected for as long as
                the user wants
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.navigation.navigate("CallScreen")}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Call</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScreenTemplate>
      );
    }
  } else {
    return (
      <ScreenTemplate>
        <View style={styles.main}>
          <View style={styles.headerview}>
            <Text style={styles.headerText}>Hey! How's it going? </Text>
            <Text style={styles.secondaryText}>
              no matter how you're feeling our dedicated volunteers are always
              here to guide you through it! give us a call or text!
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.headerText}>Chat with a volunteer</Text>
            <Text style={styles.secondaryText}>
              As a premium member you have unlimited chat time!
            </Text>
            <TouchableOpacity
              style={styles.prmbtn}
              onPress={() => props.navigation.navigate("ChatScreen")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.headerText}>Call a volunteer</Text>
            <Text style={styles.secondaryText}>
              As a premium member you have unlimited Call time!
            </Text>
            <TouchableOpacity
              style={styles.prmbtn}
              onPress={() => props.navigation.navigate("CallScreen")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenTemplate>
    );
  }
};

export default Chat;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  volunteerMain: {
    flex: 1,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    justifyContent: "center",
  },
  chatList: {
    flex: 1,
  },
  headerview: {
    flex: 0.5,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    paddingTop: 5,
  },
  card: {
    flex: 1,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  btn: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 30,
    height: 50,
    borderColor: "#7ed957",
    backgroundColor: "#7ed957",
  },
  prmbtn: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 60,
    height: 50,
    borderColor: "#7ed957",
    backgroundColor: "#7ed957",
  },
});
