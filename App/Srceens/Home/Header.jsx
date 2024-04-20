import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-react'
import Colors from '../../Utils/Colors';

export default function Header() {
    const {user, isLoading}=useUser();

    return user && (
        <View style={styles.container}>
            {/* ProfileSection */}
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={{uri:user?.imageUrl}} style={styles.userImage} />
                    <View>
                        <Text style={{ fontSize:12, color:Colors.WHITE, fontFamily:'outline',}}>Welcome,</Text>
                        <Text style={{fontSize:20,color:Colors.WHITE, fontFamily:'outline',}}>{user?.firstName}</Text>
                    </View>
                </View>
                <Ionicons name="bookmark-outline" size={27} color={Colors.WHITE}/>
            </View>

            {/* SearchSection */}
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder='Search'
                    style={styles.searchInput}
                />
                <Ionicons
                    style={styles.sreachBtn}
                name="search-outline" size={27} color="white" />
            </View>
        </View>
        
    )
}

const styles =StyleSheet.create({
    container:{
        width:'100%',
        padding:20,
        paddingTop:40,
        fontFamily:'outline',
        justifyContent:'space-between',
        backgroundColor:Colors.PRIMARY,
        borderBottomEndRadius:25,
        borderBottomLeftRadius:25,
    },
    profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10

    },
    userImage:{
        width:40,
        height:40,
        borderRadius:50,
    },
    searchBarContainer:{
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:5,
        justifyContent:'space-between',
        marginBottom:10
    },
    searchInput:{
        padding:5, 
        backgroundColor:Colors.WHITE, 
        borderRadius:10, 
        color:Colors.BLACK,
        width:'80%',
        fontSize: 16
    },
    sreachBtn:{
        backgroundColor:Colors.WHITE,
        color:Colors.PRIMARY,
        borderRadius:10,
        padding:7,
        
    }})