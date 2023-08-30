import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function WelcomeScreen() {
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>        
            <Text style={styles.headerText}>Welcome to</Text>
            <Image style={styles.logo} source={require("../assets/mindspaceicon.png")}/>
        </View>
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>The space for your MIND is here!</Text>
            <TouchableOpacity style={styles.startButton}>
                <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
        width: Dimensions.get("screen").width,
        alignItems: "center",
        justifyContent: "space-around",
        borderColor: "black",
        borderWidth: 2
    },
    logo: {
        height: 250,
        width: 250,
        objectFit: "scale-down",
    },
    headerContainer: {
        alignItems: "center",
    },
    headerText: {
        fontSize: 40,
        margin: 10,
    },
    footerContainer: {
        flex: 0.2,
        alignItems: "center"
    },
    footerText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 40,
    },
    startButton: {
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 25,
        padding: 20,
        width: 200
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    }
})