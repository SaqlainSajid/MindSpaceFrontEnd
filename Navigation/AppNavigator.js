
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MySpace from "../screens/MySpace";
import Vent from "../screens/Vent";
import Relaxation from "../screens/Relaxation";
import Discussion from "../screens/Discussion";
import BookSession from "../screens/BookSession";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MySpace} options={{
                tabBarLabel: 'MySpace',
            }}/>
        </Tab.Navigator>
    )
}

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MySpace}/>
                {/* <Stack.Screen name="Vent" component={Vent} options={{headerBackTitle: "Back"}}/>
                <Stack.Screen name="Relaxation" component={Relaxation} options={{headerBackTitle: "Back"}}/>
                <Stack.Screen name="Discussion" component={Discussion} options={{headerBackTitle: "Back"}}/>
                <Stack.Screen name="BookSession" component={BookSession} options={{headerBackTitle: "Back"}}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;