import { View, Text, FlatList, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import Heading from '../../Components/Heading'
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem'
import { TouchableOpacity } from 'react-native'

export default function BookingScreen() {

  const {user}=useUser() 
  const [booking, setBooking] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);


  useEffect(()=>{
    user&&getUserBookings();
  },[user])

  const getUserBookings=()=>{
    setLoading(true)
    GlobalApi.GetUserBookings(user.primaryEmailAddress.emailAddress).then(
      (resp)=>{
        setBooking(resp?.bookings),
        setLoading(false)
      }
    )
  }
  return (
    <View style={{padding:15,paddingTop:25}}>
      <Heading text={'My Bookings'}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom:20}}
      >
        <FlatList
        onRefresh={()=>getUserBookings()}
        refreshing={loading}
          data={booking}
          renderItem={({item})=>(
              <BusinessListItem
                business={item?.business_List}
                booking={item}
              />
          )}
        />

      </ScrollView>
    </View>
  )
}