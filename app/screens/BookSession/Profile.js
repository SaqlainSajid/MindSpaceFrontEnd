import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.pic} source={props.pic} />
        <View style={styles.namedegrees}>
          <Text style={styles.name}>{props.name}</Text>
          <View style={styles.degrees}>
            {props.degrees.map((item) => (
              <View key={item.id} style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 14 }}>{item.name}</Text>
                <Text style={{ fontSize: 14 }}>({item.major})</Text>
                <Text style={{ fontSize: 14 }}>{item.institution}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.main}>
        {props.spec.map((item) => (
          <View
            id={item.id}
            style={{ flexDirection: "row", alignItems: "flex-start" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                marginRight: 5,
              }}
            >
              {"\u2022"}
            </Text>
            <Text style={{ marginTop: 8 }}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Booking")}
        >
          <Text style={{ color: "white" }}>BOOK NOW</Text>
        </TouchableOpacity>
        <View style={styles.payment}>
          {props.payment.map((item) => (
            <View key={item.id} style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>
                {item.amount}/{item.timemins}mins
              </Text>
            </View>
          ))}
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  namedegrees: {
    flex: 1,
    marginRight: 30,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    flexWrap: "wrap",
    textAlign: "center",
    marginTop: 10,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  degrees: {
    flex: 1,
    marginVertical: 10,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#7ed957",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
});
