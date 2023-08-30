import { StyleSheet, View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './app/screens/WelcomeScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import LoginScreen from './app/screens/LoginScreen';


export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LoginScreen/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android"? StatusBar.currentHeight:0,
  },
});
