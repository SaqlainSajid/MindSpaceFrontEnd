import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import LoginScreen from "../screens/LoginSignup/LoginScreen";
import SignUpScreen from "../screens/LoginSignup/SignUpScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome Screen"
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Signup Screen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
