import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';


const Chat = props => {
    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
            </View>
            <View style={styles.inputContainer}>
                <Button title='voice message'/>
                <TextInput/>
                <Button title='camera'/>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.text}>0:14:59</Text>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#4464bc',
    },
    chatContainer: {
      flex: 12,
      fontFamily: "semiBold",
      
    },
    inputContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: 'white',
      padding: 10
    },
    timerContainer: {
      flex: 2,
      backgroundColor: "lightblue",
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      color: "red",
      fontWeight: "bold",
      fontSize: 18
    }
  });

export default Chat;