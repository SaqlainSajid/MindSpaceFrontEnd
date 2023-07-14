import React from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native';

const MySpace = props => {
    return (
        <View>
            <Text>What would you like to do today?</Text>
            <Text>Continue Chatting</Text>
            <Text>Start where you left...</Text>
            <Button title="v"/>
            <Button title='Start your day with calmness' onPress={()=>props.navigation.navigate('Relaxation')}/>
            <Button title="See what's buzzing in the topic" onPress={()=>props.navigation.navigate('Discussion')}/>
            <Button title='Book a session with professionals' onPress={()=>props.navigation.navigate('BookSession')}/>
            <Button title='Something on your mind?' onPress={()=>props.navigation.navigate('Vent')}/>

        </View>
    );
}

export default MySpace;