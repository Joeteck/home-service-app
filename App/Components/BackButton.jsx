import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BackButton({text}) {

    const param = useRoute().params
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity 
                style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
                onPress={()=>navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text style={{fontSize:23, fontFamily:'outfit-medium'}}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}