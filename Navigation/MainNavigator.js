import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MySpace from '../screens/MySpace';
import Relaxation from '../screens/Relaxation';
import BookSession from '../screens/BookSession';
import Vent from '../screens/Vent';
import Discussion from '../screens/Discussion';
import Chat from '../screens/Chat';
import Call from '../screens/Call';
import MorningMantra from '../screens/MorningMantra';
import Anxiety from '../screens/Anxiety';
import SleepMeditation from '../screens/SleepMeditation.js';
import Unwind from '../screens/Unwind';
import Goals from '../screens/Goals';
import Anger from '../screens/Anger';
import Payment from '../screens/Payment';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="RelaxationTab" component={Relaxation} 
      options={{
        headerTitle:"Relaxation",
        tabBarLabel: "Relaxation",
        headerShown: false,
        tabBarIcon: ({color,size}) => {
          return(
            <MaterialCommunityIcons name="meditation" size={size} color={color}/>
          )
        }
      }}/>
      <Tab.Screen name="DiscussionTab" component={Discussion} 
      options={{
        headerTitle:"Discussion",
        tabBarLabel: "Discussion",
        headerShown: false,
        tabBarIcon: ({color,size}) => {
          return(
            <Octicons name="comment-discussion" size={size} color={color}/>
          )
        }
      }}/>
      <Tab.Screen name="MySpaceTab" component={MySpace} options={{
        headerTitle:"My Space",
        tabBarLabel: "MySpace",
        headerShown: false,
        tabBarIcon: ({color,size}) => {
          return(
            <MaterialCommunityIcons name="home" size={size} color={color}/>
          )
        }
      }}/>
      <Tab.Screen name="BookSessionTab" component={BookSession} options={{
        headerTitle:"Book Session",
        tabBarLabel: "BookSession",
        headerShown: false,
        tabBarIcon: ({color,size}) => {
          return(
            <Ionicons name="calendar-sharp" size={size} color={color}/>
          )
        }
      }}/>
      <Tab.Screen name="VentTab" component={Vent} 
      options={{
        headerTitle:"Vent",
        tabBarLabel: "Chat",
        headerShown: false,
        tabBarIcon: ({color,size}) => {
          return(
            <Ionicons name="chatbubble-ellipses-sharp" size={size} color={color}/>
          )
        }
      }}/>
    </Tab.Navigator>
  )
}

const MainNavigator = props => {
    return(
        <Stack.Navigator>
          <Stack.Screen name="MySpace" component={TabNavigator} options={{headerTitle: ""}}/>
          <Stack.Screen name="Relaxation" component={Relaxation} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Discussion" component={Discussion} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Vent" component={Vent} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="BookSession" component={BookSession} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Chat" component={Chat} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Call" component={Call} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="MorningMantra" component={MorningMantra} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Anxiety" component={Anxiety} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="SleepMeditation" component={SleepMeditation} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Unwind" component={Unwind} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Goals" component={Goals} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Anger" component={Anger} options={{headerBackTitle: "Back"}}/>
          <Stack.Screen name="Payment" component={Payment} options={{headerBackTitle: "Back"}}/>
        </Stack.Navigator>
    )
}

export default MainNavigator;

        