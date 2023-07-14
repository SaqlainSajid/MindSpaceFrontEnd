import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { creatBottomTabNavigator } from '@react-navigation/bottom-tabs';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = creatBottomTabNavigator();

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
      <SafeAreaView>

        <Text style={styles.text}>What would you like to do today?</Text>
        <Text>Continue Chatting</Text>
        <Button title="Start Where you left..."/>
        <Button title="v"/>
        <Button title="Start your day with calmness"/>
        <Button title="See what's buzzing in the topic"/>
        <Button title="Book a session with professionals"/>
        <Button title="Something on your mind?"/>
        <StatusBar style="auto" />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "semiBold",
  }
});
