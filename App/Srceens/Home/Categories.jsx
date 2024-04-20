import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Categories() {

    const navigation = useNavigation();
    const [category, setCategory] = useState([])

    useEffect(()=>{
        getCategory()
    }, [])
    // Get Categories API
    const getCategory=()=>{
        GlobalApi.getCategory().then(
            (resp)=>{setCategory(resp?.categories)}
        )
    }
    return (
        <View>
            <Heading text={'Categories'} isViewAll={true}/>
            <View>
                <FlatList
                    data={category}
                    numColumns={4}
                    renderItem={({item, index})=>index<=3 &&(
                        <TouchableOpacity
                            onPress={()=>navigation.push('business-list', {category:item.name})}
                            style={styles.container}>
                            <View style={styles.categoryIcon}>
                                <Image source={{uri:item?.icon?.url}} style={{width:30, height:30}}/>
                            </View>
                                <Text style={{fontFamily:'outline-medium', marginTop:5}}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    categoryIcon:{
        padding:10,
        backgroundColor: Colors.LIGHTGREY,
        borderRadius:99
    }
})