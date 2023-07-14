import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MySpace from './screens/MySpace';
import Relaxation from './screens/Relaxation';
import BookSession from './screens/BookSession';
import Vent from './screens/Vent';
import Discussion from './screens/Discussion';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RelaxationTab" component={Relaxation} 
      options={{
        headerTitle:"",
        tabBarLabel: "Relaxation",
        tabBarIcon: () => {
          return(
            <MaterialCommunityIcons name="meditation" size={24} color="black"/>
          )
        }
      }}/>
      <Tab.Screen name="DiscussionTab" component={Discussion} 
      options={{
        headerTitle:"",
        tabBarLabel: "Discussion",
        tabBarIcon: () => {
          return(
            <Octicons name="comment-discussion" size={24} color="black"/>
          )
        }
      }}/>
      <Tab.Screen name="MySpaceTab" component={MySpace} options={{
        headerTitle:"",
        tabBarLabel: "MySpace",
        tabBarIcon: () => {
          return(
            <MaterialCommunityIcons name="home" size={24} color="black"/>
          )
        }
      }}/>
      <Tab.Screen name="BookSessionTab" component={BookSession} options={{
        headerTitle:"",
        tabBarLabel: "BookSession",
        tabBarIcon: () => {
          return(
            <Ionicons name="calendar-sharp" size={24} color="black"/>
          )
        }
      }}/>
      <Tab.Screen name="VentTab" component={Vent} 
      options={{
        headerTitle:"",
        tabBarLabel: "Vent",
        tabBarIcon: () => {
          return(
            <Ionicons name="chatbubble-ellipses-sharp" size={24} color="black"/>
          )
        }
      }}/>
    </Tab.Navigator>
  )
}

export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {

    const prepare = async ()=>{
      try {
        await Font.loadAsync({
          'semiBold': require("./assets/Fonts/Montserrat/static/Montserrat-SemiBold.ttf")
        });
      } catch (error) {
        console.log(error);
      }
      finally{
        setAppIsLoaded(true);
      }
    };

    prepare();
    
  },[]);

  const onLayout = useCallback(async ()=> {
    if (appIsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if(!appIsLoaded){
    return null;
  }

  return (
    <SafeAreaProvider 
    style={styles.container}
    onLayout={onLayout}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MySpace" component={TabNavigator}/>
          <Stack.Screen name="Relaxation" component={Relaxation} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Discussion" component={Discussion} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Vent" component={Vent} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="BookSession" component={BookSession} options={{headerBackTitle: "Back"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: "semiBold",
  }
});
