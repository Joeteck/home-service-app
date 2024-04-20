import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'
import BusinessListItem from './BusinessListItem';

export default function BusinessListByCategory() {

  const param = useRoute().params
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([])

  useEffect(() => {
    getBUsinessByCategory()
  }, [])

{/* BusinessList By Category */}
  const getBUsinessByCategory=()=>{
    GlobalApi.getBusinessListByCategory(param.category).then(
      (resp)=>{setBusinessList(resp?.businessLists)
    })
  }
  return (
    <View style={{padding:15,paddingTop:25}}>
      <TouchableOpacity 
        style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
        onPress={()=>navigation.goBack()}
        >
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={{fontSize:23, fontFamily:'outline-medium'}}>{param?.category}</Text>
      </TouchableOpacity>

      {businessList.length>0 ? (
        <FlatList
          data={businessList}
          style={{marginTop:15}}
          renderItem={({item})=>(
            <BusinessListItem business={item}/>
          )}
        /> 
      )
      : 
      (
        <Text style={{fontSize:20, fontFamily:'outline-medium', marginTop:'12%', textAlign:'center', color:Colors.GREY}}>No Business Found</Text>
      )}
    </View>
  )
}