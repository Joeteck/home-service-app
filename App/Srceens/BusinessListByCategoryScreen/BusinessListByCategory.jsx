import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'
import BusinessListItem from './BusinessListItem';
import BackButton from '../../Components/BackButton';

export default function BusinessListByCategory() {

  const param = useRoute().params
  const [businessList, setBusinessList] = useState([])
  const [isLoading, setIsLoadiing] = useState(true)

  useEffect(() => {
    getBUsinessByCategory();
  }, [])

{/* BusinessList By Category */}
  const getBUsinessByCategory=()=>{
    setIsLoadiing(true);
    GlobalApi.getBusinessListByCategory(param.category).then(
      (resp)=>{setBusinessList(resp?.businessLists, setIsLoadiing(false))
    })
  }
  return (
    <View style={{padding:15,paddingTop:25}}>

      <BackButton text={param?.category}/>

      {businessList.length>0 && (
        <FlatList
          data={businessList}
          style={{marginTop:15}}
          renderItem={({item})=>(
            <BusinessListItem business={item}/>
          )}
        /> 
      )
      }
      {isLoading &&
          <Text style={{fontSize:20, fontFamily:'outfit-medium', marginTop:'12%', textAlign:'center', color:Colors.GREY}}>Loading...</Text>
      }      
      {!isLoading && businessList.length==0 && 
        <Text style={{fontSize:20, fontFamily:'outfit-medium', marginTop:'12%', textAlign:'center', color:Colors.GREY}}>No Business Found</Text>
      }      
    </View>
  )
}