import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';



const Chat = props => {
    return (
        <SafeAreaView 
        style={styles.container} 
        edges={["right","bottom","left"]}>
          <View style={styles.banner}>
            <Text>You are using the free version. Talk to a</Text>
            <Text>volunteer for 15 minutes for free!</Text>
          </View>
          <View style={styles.chatContainer}>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
            style={styles.mediaButton} 
            title="gallery" 
            onPress={() => console.log("add image")}>
              <MaterialIcons name="image" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.mediaButton} 
            title="voice" 
            onPress={() => console.log("voice message")}>
              <MaterialIcons name="keyboard-voice" size={24} color="black"/>
            </TouchableOpacity>
            <TextInput style={styles.textInput}/>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.text}>0:14:59</Text>
          </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#7ab1e3',
      alignItems: "center"
    },
    banner: {
      flex: 1.5,
      backgroundColor: "white",
      width: 350,
      alignItems: "center",
      justifyContent: "center", 
      borderRadius: 10,
    },
    chatContainer: {
      flex: 12,
      fontFamily: "semiBold",
      
    },
    inputContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: 'white',
      padding: 10,
      width: 350
    },
    timerContainer: {
      flex: 1.5,
      backgroundColor: "lightblue",
      justifyContent: "center",
      alignItems: "center",
      width: 350
    },
    text: {
      color: "red",
      fontFamily: "semiBold",
      fontSize: 18
    },
    textInput: {
      flex: 1,
      backgroundColor: "lightgrey",
      borderWidth: 1,
      borderRadius: 13,
      marginHorizontal: 3,
      marginVertical: 5
    },
    mediaButton: {
      justifyContent: "center",
      alignItems: "center",
      width: 30
    }
  });

export default Chat;