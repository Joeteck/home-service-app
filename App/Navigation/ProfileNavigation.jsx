import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ProfilesScreen from '../Srceens/ProfilesScreen/ProfileScreen';
import HelpScreen from '../Srceens/ProfilesScreen/HelpScreen';
import AboutScreen from '../Srceens/ProfilesScreen/AboutScreen';


const Stack = createStackNavigator();

export default function ProfileNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile" component={ProfilesScreen} />
            <Stack.Screen name="help" component={HelpScreen} />
            <Stack.Screen name="about" component={AboutScreen} />
        </Stack.Navigator>
    )
}