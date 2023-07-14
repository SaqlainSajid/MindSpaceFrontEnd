import React from 'react';
import { View, Text, Button } from 'react-native';

const Discussion = props => {
    return (
        <View>
            <Button title="Morning Mantra" onPress={()=>{props.navigation.navigate('MorningMantra')}}/>
            <Text>Anxiety Card</Text>
            <Text>Sleep Meditation Card</Text>
            <Text>Unwind your mind</Text>
            <Text>Goals</Text>
            <Text>Anger Meditation</Text>
        </View>
    );
}

export default Discussion;