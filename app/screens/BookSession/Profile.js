import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Profile = (props) => {
  console.log(props.degrees[0].name);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.pic} source={props.pic} />
        <View style={styles.namedegrees}>
          <Text style={styles.name}>{props.name}</Text>
          <View style={styles.degrees}>
            {props.degrees.map((item) => {
              <View key={item.id} style={{ flexDirection: "row" }}>
                <Text>{item.name}</Text>
                <Text>({item.major})</Text>
                <Text>{item.institution}</Text>
              </View>;
            })}
          </View>
        </View>
      </View>
      <View style={styles.main}>
        {props.spec.map((item) => {
          <View id={item.id} style={{ flexDirection: "row" }}>
            <Text>{item}</Text>
          </View>;
        })}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text>BOOK NOW</Text>
        </TouchableOpacity>
        <View style={styles.payment}>
          {props.payment.map((item) => {
            <View style={{ flexDirection: "row" }}>
              <Text>{item}</Text>
            </View>;
          })}
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pic: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  namedegrees: {
    flex: 1,
    marginRight: 50,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    flexWrap: "wrap",
    textAlign: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  degrees: {
    flex: 1,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
