import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import TwoWordText from '../../Components/TwoWordLimit'

export default function BusinessListItemSmall({business}) {
    return (
        <View style={styles.container}>
        <Image source={{uri:business?.images[0]?.url}}
            style={styles.image}/>
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{business?.name}</Text>
                <Text style={{fontSize:13, fontFamily:'outline', color:Colors.GREY}}>{business?.contactPerson}</Text>
                <Text style={{fontSize:10, 
                    fontFamily:'outline', 
                    padding:3, color:Colors.PRIMARY,
                    backgroundColor:Colors.PRIMARY_LIGHT, 
                    borderRadius:3, alignSelf:'flex-start', 
                    paddingHorizontal:7
                }}>
                    {business?.category?.name}
                </Text>
            </View>
        </View>
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
        fontFamily: 'outline-medium',
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