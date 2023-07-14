import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppNavigator from './Navigation/AppNavigator';




SplashScreen.preventAutoHideAsync();



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
      <AppNavigator/>
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
