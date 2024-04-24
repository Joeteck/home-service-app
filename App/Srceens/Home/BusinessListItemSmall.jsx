import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../Utils/Colors'
import TwoWordText from '../../Components/TwoWordLimit'

export default function BusinessListItemSmall({business}) {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={()=>navigation.navigate('business-details', {business:business})}
            >
            <Image source={{uri:business?.images[0]?.url}}
                style={styles.image}/>
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{business?.name}</Text>
                <Text style={{fontSize:13, fontFamily:'outfit', color:Colors.GREY}}>{business?.contactPerson}</Text>
                <Text style={{fontSize:10, 
                    fontFamily:'outfit', 
                    padding:3, color:Colors.PRIMARY,
                    backgroundColor:Colors.PRIMARY_LIGHT, 
                    borderRadius:3, alignSelf:'flex-start', 
                    paddingHorizontal:7
                }}>
                    {business?.category?.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor:Colors.WHITE,
        borderRadius:6,
    },
    infoContainer:{
        padding:7,
        display:'flex',
        gap:3
    },
    name: {
        fontSize: 15,
        fontFamily: 'outfit-medium',
        overflow: 'hidden',
        maxWidth:150
    },
    image:{
        width:160,
        height:100,
        borderRadius:6,
        objectFit:'cover'
    }
})