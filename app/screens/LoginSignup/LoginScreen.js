import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true);
    const result = await authApi.login(email, password);
    if (!result.ok) {
      setLoginFailed(true);
      setIsLoading(false);
      return;
    }
    setLoginFailed(false);
    const user = JSON.parse(atob(result.data.split(".")[1]));
    authContext.setUser(user);
    authStorage.storeToken(result.data);
    setIsLoading(false);
  };
  return (
    <ScreenTemplate>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainTextContainer}>
            <Text style={[styles.text, styles.mainText]}>Welcome</Text>
            <Text style={[styles.text, styles.mainText]}>Back</Text>
            <View style={styles.secondaryTextContainer}>
              <Text style={[styles.text, styles.secondaryText]}>Log in to continue</Text>
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
                        Invalid Email or Password
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
                      onChangeText={(text) => {
                        setLoginFailed(false);
                        handleChange("email")(text);
                      }}
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
                      onChangeText={(text) => {
                        setLoginFailed(false);
                        handleChange("password")(text);
                      }}
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
                      disabled={isLoading}
                    />
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.FooterTextContainer}>
              <TouchableOpacity>
                <Text style={[styles.text, styles.FooterText]}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={[styles.text, styles.secondaryText]}>New user? Sign Up{" "}</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Signup Screen")}
                >
                  <Text style={[styles.text, styles.FooterText]}>here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: Platform.OS === "ios" ? 50 : 20,
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
