import React from 'react';
import { View, Text, Button, } from 'react-native';

const Vent = props => {
    return (
        <View>
            <Button title="Hey how's it going?" onPress={()=>{props.navigation.navigate('Chat')}}/>
            <Button title="Want to talk over call?" onPress={()=>{props.navigation.navigate('Call')}}/>
            <Button title="I'm a subscribed member - "/>
        </View>
    );
}

export default Vent;