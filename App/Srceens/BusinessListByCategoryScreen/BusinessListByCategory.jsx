import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'
import BusinessListItem from './BusinessListItem';
import BackButton from '../../Components/BackButton';

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

      <BackButton text={param?.category}/>

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
        <Text style={{fontSize:20, fontFamily:'outfit-medium', marginTop:'12%', textAlign:'center', color:Colors.GREY}}>No Business Found</Text>
      )}
    </View>
  )
}