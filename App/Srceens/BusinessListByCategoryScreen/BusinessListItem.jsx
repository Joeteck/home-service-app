import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Utils/Colors'
import TwoWordLimit  from '../../Components/TwoWordLimit'
import { useNavigation } from '@react-navigation/native'
import EditBookingModal from '../Booking/EditBookingModal'

export default function BusinessListItem({business, booking}) {

    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false);
    const statusColor = Colors.STATUS_COLORS[booking?.bookingStatus];
    const statusBackgroundColor = Colors.STATUS_BACKGROUND_COLORS[booking?.bookingStatus];
    
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={()=>navigation.navigate('business-details', {business:business})}
            disabled={!!booking?.id}
            >
            <Image
                source={{uri:business?.images[0]?.url}}
                style={styles.image}
            />

            <View style={styles.subContainer}>
                <Text style={{fontSize:13, fontFamily:'outfit', color:Colors.GREY}}>{business?.contactPerson}</Text>
                <Text style={{fontFamily:'outfit-bold', maxWidth:200}} numberOfLines={1} ellipsizeMode='tail'>
                {business?.name}
                </Text>
                {booking?.id ?
                    <>
                        <View style={{display:'flex', flexDirection:'row', gap:50}}>
                            <Text style={{fontFamily: 'outfit-medium', color: statusColor, fontSize: 12, backgroundColor: statusBackgroundColor, padding: 3, borderRadius: 3, width: 80, textAlign: 'center'}}>{booking?.bookingStatus}</Text>
                            <TouchableOpacity
                                onPress={() =>{setShowModal(true)}}
                            
                            >
                                <Text style={{fontSize:12, fontFamily:'outfit', color:Colors.PRIMARY, borderWidth:1, borderColor:Colors.PRIMARY, borderRadius:3, padding:15, paddingVertical:2 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{fontSize:12, fontFamily:'outfit', color:Colors.GREY, maxWidth:225, alignSelf:'flex-start' }} >
                            <Ionicons name="calendar-outline" size={12} color={Colors.PRIMARY} style={{marginRight:5}}/> 
                            { booking?.date + ' at '+ booking?.time }
                        </Text>
                        <Modal
                            visible={showModal}
                        >
                            <EditBookingModal booking={booking} hideModal={() => setShowModal(false)}/>
                        </Modal>
                    </>
                :
                <Text style={{fontSize:14, fontFamily:'outfit', color:Colors.GREY, maxWidth:200}} numberOfLines={2} ellipsizeMode='tail'>
                    <Ionicons name="location-sharp" size={18} color={Colors.PRIMARY} style={{marginRight:5}} />
                    {business?.address}
                </Text>
                }

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        gap:8,
        padding:10,
        backgroundColor: Colors.WHITE,
        borderRadius:14,
        marginBottom:15
    },
    subContainer:{
        display:'flex',
        gap:4
    },
    image:{
        width:80,
        height:80,
        borderRadius:10
    }
})