import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import authApi from "../../api/authApi";
import { Formik } from "formik";
import * as Yup from "yup";
import { decode } from "base-64";
import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";

global.atob = decode;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login2 = (props) => {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    const user = JSON.parse(atob(result.data.split(".")[1]));
    authContext.setUser(user);
    authStorage.storeToken(result.data);
  };
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
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <View style={styles.inputContainer}>
                {loginFailed ? (
                  <Text style={{ color: "red", alignSelf: "center" }}>
                    Ivalid Email or Password
                  </Text>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.text}>EMAIL/USERNAME</Text>
                <TextInput
                  name="email"
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={handleChange("email")}
                ></TextInput>
              </View>
              <Text style={{ color: "red" }}>{errors.email}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>PASSWORD</Text>
                <TextInput
                  name="password"
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholder="Password"
                  autoCorrect={false}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                ></TextInput>
              </View>
              <Text style={{ color: "red" }}>{errors.password}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  text="Login"
                  class="primary"
                  Style={{ width: 300 }}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
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
