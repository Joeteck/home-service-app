import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../Srceens/Home/HomeScreen';
import ProfileScreen from '../Srceens/ProfilesScreen/ProfileScreen';
import BookingScreen from '../Srceens/Booking/BookingScreen';
import Colors from '../Utils/Colors'
import HomeNavigation from './HomeNavigation';


const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator 
    screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY }}>
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{color:color, fontSize:12, marginTop:-7}}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
        name="homescreen" component={HomeNavigation} />
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{color:color, fontSize:12, marginTop:-7}}>Booking</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          )
        }}
        name="booking" component={BookingScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{color:color, fontSize:12, marginTop:-7}}>Profile</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          )
        }}
        name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}