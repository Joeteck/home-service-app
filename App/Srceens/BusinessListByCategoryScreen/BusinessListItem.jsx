import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Utils/Colors'
import TwoWordLimit  from '../../Components/TwoWordLimit'
import { useNavigation } from '@react-navigation/native'

export default function BusinessListItem({business}) {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={()=>navigation.navigate('business-details', {business:business})}
            >
            <Image
                source={{uri:business?.images[0]?.url}}
                style={styles.image}
            />

            <View style={styles.subContainer}>
                <Text style={{fontSize:13, fontFamily:'outfit', color:Colors.GREY}}>{business?.contactPerson}</Text>
                <Text style={{fontFamily:'outfit-bold', maxWidth:200}} numberOfLines={1} ellipsizeMode='tail'>
                {business?.name}
                </Text>
                <Text style={{fontSize:14, fontFamily:'outfit', color:Colors.GREY, maxWidth:200}} numberOfLines={2} ellipsizeMode='tail'>
                    <Ionicons name="location-sharp" size={18} color={Colors.PRIMARY} style={{marginRight:5}} />
                    {business?.address}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        gap:8,
        padding:10,
        backgroundColor: Colors.WHITE,
        borderRadius:14,
        marginBottom:15
    },
    subContainer:{
        display:'flex',
        gap:4
    },
    image:{
        width:80,
        height:80,
        borderRadius:10
    }
})