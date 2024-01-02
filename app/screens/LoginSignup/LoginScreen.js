import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import authApi from "../../api/authApi";

const Login2 = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenTemplate>
      <View style={styles.mainTextContainer}>
        <Text style={[styles.text, styles.mainText]}>Welcome</Text>
        <Text style={[styles.text, styles.mainText]}>Back</Text>
        <View style={styles.secondaryTextContainer}>
          <Text style={[styles.text, styles.secondaryText]}>
            Log in to continue
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>EMAIL/USERNAME</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Password"
            autoCorrect={false}
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            text="Login"
            class="primary"
            Style={{ width: 300 }}
            onPress={() => props.navigation.navigate("My Space")}
          />
        </View>
        <View style={styles.FooterTextContainer}>
          <TouchableOpacity>
            <Text style={[styles.text, styles.FooterText]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={[styles.text, styles.secondaryText]}>
              New user? Sign Up{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup Screen")}
            >
              <Text style={[styles.text, styles.FooterText]}>here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Login2;

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
    justifyContent: "space-evenly",
  },
  button: {
    alignSelf: "center",
  },
  FooterTextContainer: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  FooterText: {
    textDecorationLine: "underline",
    fontSize: 14,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
