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
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 50,
  },
  inputContainer: {
    marginBottom: 10,
    //alignItems: "center",
  },
  labelText: {
    color: "black",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#c5c6e6",
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    alignSelf: "center",
  },
  FooterTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  FooterText: {
    textDecorationLine: "underline",
    fontSize: 14,
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 1,
    marginBottom: 1,
  },
});
