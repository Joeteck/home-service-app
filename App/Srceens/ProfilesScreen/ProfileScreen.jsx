import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useClerk } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-react';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

export default function ProfileScreen() {

  const {user} = useUser();
  const navigation = useNavigation();
const { clerk } = useClerk();


  const profileMenu = [
    {
      id: 1,
      name: 'Profile',
      icon: 'person',
    },
    {
      id: 2,
      name: 'Bookings',
      icon: 'calendar',
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'log-out',
    },
    {
      id: 4,
      name: 'Help',
      icon: 'help-circle',
    },
    {
      id: 5,
      name: 'About',
      icon: 'information',
    },
    {
      id: 6,
      name: 'Share',
      icon: 'share',
    }
  ]
  return (
    <View >

    <View 
      style={{padding:15,paddingTop:25, backgroundColor:Colors.PRIMARY, borderBottomRightRadius:25, borderBottomLeftRadius:25}}
    >
      <Text style={{fontSize:25, fontFamily:'outfit-bold', color:Colors.WHITE}}>Profile</Text>
      <View
        style={{display:'flex', justifyContent:'center', alignItems:'center'}}
      >
        <Image source={{uri:user?.imageUrl}} style={{width: 80, height: 80, borderRadius: 99, marginTop: 20}}/>
        <Text style={{fontSize:24, fontFamily:'outfit-medium', color:Colors.WHITE, marginTop: 15}}>{user?.firstName} {user?.lastName}</Text>
        <Text style={{fontSize:16, fontFamily:'outfit', color:Colors.WHITE, marginTop: 8}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>


    </View>

      <View style={{marginTop:40,}}>
        <FlatList
          data={profileMenu}
          renderItem={({item,index})=>(
            <TouchableOpacity 
              onPress={()=>index===3&&user&&user.primaryEmailAddress.emailAddress&&clerk.signOut()}
              style={{ padding:15, display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
            >
              <Ionicons name={item.icon} size={26} color={Colors.PRIMARY} />
              <Text style={{fontSize:16, fontFamily:'outfit', color:Colors.PRIMARY}}>{item.name}</Text>
            </TouchableOpacity>
          )}/>
      </View>

    </View>
  )
}