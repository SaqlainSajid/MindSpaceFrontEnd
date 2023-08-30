import React from 'react'
import { Text, StyleSheet, View, StatusBar, useColorScheme, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


export default function SignUpScreen() {
    const theme = useColorScheme();

    return (
      <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
        <LinearGradient style={styles.gradient} colors={["#dedae6","#cfbede","#8381bd", "#8381bd","#cfbede","#dedae6"]} locations={[0,.1,.3,.7, .9, 1]}>
        <View style={styles.form}>
            <View style={styles.name}>
                <Text style={styles.text}>NAME</Text>
                <TextInput></TextInput>
            </View>
            <View style={styles.email}>
                <Text style={styles.text}>EMAIL</Text>
                <TextInput></TextInput>
            </View>
            <View style={styles.password}>
                <Text style={styles.text}>PASSWORD</Text>
                <TextInput></TextInput>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
        <StatusBar barStyle={theme === "dark" ? "dark-content" : "light-content"} />     
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A1145",
        width: 400,
    },
    gradient: {
        flex: 1,
    },
    form: {
    
    },
    name: {

    },
    email: {

    },
    password: {

    },
    button: {

    },
    text: {
        color: "white",
        fontSize: 16,
    }
})
