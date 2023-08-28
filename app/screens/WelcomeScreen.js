import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {
  return (
    <View style={styles.background}>
      <Text>This is the welcome screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#fcfcfc",
    }
})