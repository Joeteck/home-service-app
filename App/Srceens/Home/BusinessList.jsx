import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall'

export default function BusinessList() {

    const [businessList, setBusinessList] = useState([])
    useEffect(()=>{getBusinessList()}, [])
    const getBusinessList = ()=>{
        GlobalApi.getBusinessLists().then(
            (resp)=>{setBusinessList(resp?.businessLists)}
        )
    } 
    return (
        <View>
            <Heading text={'Business List'} isViewAll={true}/>
            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({item, index})=>
                    <View style={{marginRight:10}}>
                        <BusinessListItemSmall business={item}/>
                    </View>
                    }
            />
        </View>
    )
}