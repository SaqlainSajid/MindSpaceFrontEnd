import React from 'react';
import { View, Text, Button } from 'react-native';

const Discussion = props => {
    return (
        <View>
            <Button title="Morning Mantra" onPress={()=>{props.navigation.navigate('MorningMantra')}}/>
            <Button title="Anxiety" onPress={()=>{props.navigation.navigate('Anxiety')}}/>
            <Button title="SleepMeditation" onPress={()=>{props.navigation.navigate('SleepMeditation')}}/>
            <Button title="Unwind your mind" onPress={()=>{props.navigation.navigate('Unwind')}}/>
            <Button title="Goals" onPress={()=>{props.navigation.navigate('Goals')}}/>
            <Button title="Anger" onPress={()=>{props.navigation.navigate('Anger')}}/>
        </View>
    );
}

export default Discussion;