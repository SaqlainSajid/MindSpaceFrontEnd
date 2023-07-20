
import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./MainNavigator";
import Auth from "../screens/Auth";





const AppNavigator = props => {

    const isAuth = true;

    return (
    <NavigationContainer>
        {isAuth && <MainNavigator/>}
        {!isAuth && <Auth/>}
    </NavigationContainer>
    )
}

export default AppNavigator;