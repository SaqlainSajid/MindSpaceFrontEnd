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
      flex: 14,
      fontFamily: "semiBold",
      color: "#ffffff",
    },
    inputContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: 'white'
    }
  });

export default Chat;