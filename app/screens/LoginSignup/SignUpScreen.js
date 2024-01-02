import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";

const SignUpScreen = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.mainTextContainer}>
        <Text style={[styles.text, styles.mainText]}>Create new</Text>
        <Text style={[styles.text, styles.mainText]}>Account</Text>
        <View style={styles.secondaryTextContainer}>
          <Text style={[styles.text, styles.secondaryText]}>
            Already Registered? Log in{" "}
          </Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => props.navigation.navigate("Login Screen")}
          >
            <Text style={[styles.text, styles.linkText]}>here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>NAME</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>EMAIL</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>PASSWORD</Text>
          <TextInput style={styles.input} secureTextEntry={true}></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            text="Sign Up"
            class="primary"
            Style={{ width: 300 }}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainTextContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  mainText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
  secondaryTextContainer: {
    flexDirection: "row",
  },
  secondaryText: {
    fontSize: 14,
  },
  linkText: {
    textDecorationLine: "underline",
    fontSize: 14,
  },
  form: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 20,
    marginHorizontal: 50,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  input: {
    width: 300,
    height: 60,
    backgroundColor: "#c5c6e6",
    borderRadius: 20,
    fontSize: 18,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
