import React from 'react';
import { View, Text, Button } from 'react-native';

const BookSession = props => {
    return (
        <View>
            <Button title="Pay Advance" onPress={()=>{props.navigation.navigate('Payment')}}/>
            <Text>Doctor Card 2</Text>
            <Text>Doctor Card 3</Text>
        </View>
    );
}

export default BookSession;