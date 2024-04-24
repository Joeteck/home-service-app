import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Heading from '../../Components/Heading'

export default function BusinessPhotos({images}) {

    const [photo, setPhoto] = useState(images)

    return (
        <View>
            <Heading text={'Photos'} />
            <FlatList
                data={photo}
                numColumns={2}
                renderItem={({item})=>(
                    <Image 
                        source={{uri:item?.url}}
                        style={{width:'100%', flex:1, borderRadius:8, margin:5, height:100}}
                        />
                )}
            />
        </View>
    )
}