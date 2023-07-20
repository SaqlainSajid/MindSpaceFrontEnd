import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const Chat = props => {
  const [messageText, setMessageText] = useState(""); //messageTExt starts off with "" then we change it
  //to the value written in the text box

  return (
      <SafeAreaView 
      style={styles.container} 
      edges={["right","bottom","left"]}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={ Platform.OS === "ios"?"padding": undefined } keyboardVerticalOffset={100}>

        <View style={styles.chatBackground}>

          <View style={styles.banner}>

            <Text style={styles.bannerText}>You are using the free version. Talk to a</Text>

            <Text style={styles.bannerText}>volunteer for 15 minutes for free!</Text>

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

            { messageText === "" && <TouchableOpacity  //conditional rendering, if messageText empty render TouchableOpacity
            style={styles.mediaButton} 
            title="voice">

              <MaterialIcons name="keyboard-voice" size={24} color="black"/>

            </TouchableOpacity> }

            { messageText !== "" && <TouchableOpacity  //conditional rendering, if messageText != empty render TouchableOpacity
            style={styles.mediaButton} 
            title="send">

              <Feather name="send" size={24} color="#4361ee"/>

            </TouchableOpacity> }

            <TextInput 
            style={styles.textInput}
            value={messageText}    //we're storing the entered string, so that if sending fails, we can recover the string
            onChangeText={(text) => {setMessageText(text)}}/>

          </View>

          <View style={styles.timerContainer}>

            <Text style={styles.timerText}>0:14:59</Text>

          </View>

        </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#7ab1e3",
      alignItems: "center"
    },
    banner: {
      flex: 1,
      backgroundColor: "lightblue",
      width: 350,
      alignItems: "center",
      justifyContent: "center", 
      borderRadius: 10,
      alignSelf: "flex-start",
      minHeight: 13
    },
    bannerText: {
      fontFamily: "semiBold",
      fontSize: 12
    },
    chatBackground: {
      flex: 12,
      backgroundColor: "white",
      alignSelf: "stretch",
      width: 350,
      marginHorizontal: 12,
      marginTop: 12,
      borderRadius: 10
    },
    chatContainer: {
      flex: 10,
    },
    inputContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: 'white',
      padding: 10,
      width: 350,
      minHeight: 30,
      alignItems:"center"
    },
    timerContainer: {
      flex: 1,
      backgroundColor: "lightblue",
      justifyContent: "center",
      alignItems: "center",
      width: 350,
      borderRadius: 10,
      alignSelf: "flex-end",
    },
    timerText: {
      color: "red",
      fontFamily: "semiBold",
      fontSize: 18,
    },
    textInput: {
      flex: 1,
      backgroundColor: "#dddedf",
      borderWidth: 1,
      borderRadius: 13,
      marginHorizontal: 3,
      marginTop: 13,
      marginBottom: 13,
      paddingHorizontal: 10,
      minHeight: 30,
    },
    mediaButton: {
      justifyContent: "center",
      alignItems: "center",
      width: 30,
      marginVertical: 13,
      minHeight: 30
    }
  });

export default Chat;