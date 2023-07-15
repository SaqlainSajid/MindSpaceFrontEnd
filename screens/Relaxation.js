import React from 'react';
import { View, Text, Button } from 'react-native';

const Discussion = props => {
    return (
        <View>
            <Button title="Morning Mantra" onPress={()=>{props.navigation.navigate('MorningMantra')}}/>
            <Button title="Anxiety" onPress={()=>{props.navigation.navigate('Anxiety')}}/>
            <Button title="SleepMeditation" onPress={()=>{props.navigation.navigate('SleepMeditation')}}/>
            <Text>Unwind your mind</Text>
            <Text>Goals</Text>
            <Text>Anger Meditation</Text>
        </View>
    );
}

export default Discussion;