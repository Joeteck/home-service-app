import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../Srceens/Home/HomeScreen';
import BusinessListByCategory from '../Srceens/BusinessListByCategoryScreen/BusinessListByCategory';
import BusinessDetailScreen from '../Srceens/BusinessDetailScreen/BusinessDetailScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="business-list" component={BusinessListByCategory} />
            <Stack.Screen name="business-details" component={BusinessDetailScreen} />
        </Stack.Navigator>
    )
}