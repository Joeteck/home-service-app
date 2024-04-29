import { View, Text, Image, FlatList, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();

  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      action: () => {
        // Redirect to the profile page
        navigation.navigate('homescreen');
      },
    },
    {
      id: 2,
      name: 'Bookings',
      icon: 'calendar',
      action: () => {
        // Redirect to the bookings page
        navigation.navigate('booking');
      },
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'log-out',
      action: () => {signOut()},
    },
    {
      id: 4,
      name: 'Help',
      icon: 'help-circle',
      action: () => {
        // Redirect to the help page
      navigation.navigate('help')
      },
    },
    {
      id: 5,
      name: 'About',
      icon: 'information',
      action: () => {
        // Redirect to the about page
        navigation.navigate('about')
      },
    },
    {
      id: 6,
      name: 'Share',
      icon: 'share',
      action: () => {
        // Implement sharing functionality here
        // Example: implementShareFunction();
        // Implement sharing functionality here
        Share.share({
            message: 'Check out this cool app, download the latest version here! : https://drive.google.com/drive/folders/1oGng28llrQT_Cn9TsS-sBZy5Mz3rqEKt?usp=sharing', // Message to be shared
            url: 'https://drive.google.com/drive/folders/1oGng28llrQT_Cn9TsS-sBZy5Mz3rqEKt?usp=sharing', // URL to be shared (replace with your app's download link)
          })
      },
    }
  ]

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View>
      <View 
        style={{padding:15, paddingTop:25, backgroundColor:Colors.PRIMARY, borderBottomRightRadius:25, borderBottomLeftRadius:25}}
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
              onPress={item.action}
              style={{ padding:15, display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
            >
              <Ionicons name={item.icon} size={26} color={Colors.PRIMARY} />
              <Text style={{fontSize:16, fontFamily:'outfit', color:Colors.PRIMARY}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}