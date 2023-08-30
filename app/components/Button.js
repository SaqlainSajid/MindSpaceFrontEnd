import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'


export default function Button (props){
  
    return (
        <TouchableOpacity style={[styles[props.class],props.Style]}>
        <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    primary: {
        alignItems: "center",
        backgroundColor: "#0a1145",
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
