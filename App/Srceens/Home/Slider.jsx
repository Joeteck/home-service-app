import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading'

export default function Slider() {

    const [slider, setSlider] = useState([])
    useEffect(()=>{
        getSlider()
    }, [])
    const getSlider=()=>{
        GlobalApi.getSlider().then(
            (resp)=>{setSlider(resp?.sliders)}
        )
    }
    return (
        <View>
            <Heading text={'Offers For You!'}/>
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>(
                    <View style={{marginRight:10}}>
                        <Image source={{uri:item?.image?.url}} style={styles.sliderImage}/>
                    </View>
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    sliderImage:{
        width:235,
        height:120,
        borderRadius:20,
        objectFit:'cover'
    }
})