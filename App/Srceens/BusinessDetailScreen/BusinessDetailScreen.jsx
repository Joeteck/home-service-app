import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function BusinessDetailScreen() {

    const param = useRoute().params
    const [business, setBusiness] = useState([param.business])

    return (
        <View>
            <Image 
                source={{uri:business?.images[0]?.url}}
                style={{width:'100%', height:260}}
            />
        <Text>BusinessDetailScreen</Text>
        </View>
    )
}