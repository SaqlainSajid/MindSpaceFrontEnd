import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';


const Chat = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Chat Screen</Text>
            <View>
                <Button title='image'/>
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
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      fontFamily: "semiBold",
      color: "#ffffff",
    }
  });

export default Chat;