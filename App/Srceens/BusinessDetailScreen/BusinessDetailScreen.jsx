import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';
import BackButton from '../../Components/BackButton';

export default function BusinessDetailScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [business, setBusiness] = useState(param.business);
    const [isReadMore, setIsReadMore] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.backBtnContainer}>
                <BackButton/>
            </View>

            <ScrollView style={{marginTop: 5, height: '95%'}}>
                <Image 
                    source={{uri: business?.images[0]?.url}}
                    style={{width: '100%', height: 260}}
                />

                <View style={styles.infoContainer}>
                    <Text style={{fontSize: 20, fontFamily: 'outfit-bold'}}>{business?.name}</Text>
                    <View style={styles.subContainer}>
                        <Text style={{fontFamily: 'outfit-medium', color: Colors.PRIMARY, fontSize: 16}}>{business?.contactPerson} 🌟 </Text>
                        <Text style={{fontFamily: 'outfit', color: Colors.PRIMARY, fontSize: 12, backgroundColor: Colors.PRIMARY_LIGHT, padding: 3, borderRadius: 3}}>{business?.category?.name}</Text>
                    </View>
                    <Text style={{fontSize: 15, fontFamily: 'outfit', color: Colors.GREY}}>
                        <Ionicons name="location-sharp" size={18} color={Colors.PRIMARY} style={{marginRight: 5}} />
                        {business?.address}
                    </Text>
                    
                    {/* Horizontal Line */}
                    <View style={{width: '100%', height: 0.5, backgroundColor: Colors.GREY, marginVertical: 10}}/>
                    
                    <View>
                        <Heading text={'About Us'}/>
                        <Text style={{fontSize: 14, fontFamily: 'outfit', color: Colors.GREY, lineHeight: 22, textAlign: 'justify'}} numberOfLines={isReadMore ? 100 : 5}>
                            {business?.about}
                        </Text>
                        <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                            <Text style={{fontSize: 14, color: Colors.PRIMARY, fontFamily: 'outfit'}}>
                                {isReadMore ? 'Read Less' : 'Read More'}
                            </Text>
                        </TouchableOpacity>
                        
                    </View>

                    {/* Horizontal Line */}
                    <View style={{width: '100%', height: 0.5, backgroundColor: Colors.GREY, marginVertical: 10}}/>

                    <BusinessPhotos images={business?.images}/>
                </View>
            </ScrollView>

            <View style={{padding: 10, display: 'flex', flexDirection: 'row', gap: 10, bottom: 0 }}>
                <TouchableOpacity 
                    style={styles.messageBtn}
                    onPress={() => navigation.navigate('booking', {business:business})}
                    >
                    <Text style={{textAlign:'center', color: Colors.PRIMARY, fontFamily:'outfit-medium', fontSize: 15}}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.bookBtn}
                    onPress={() =>{setShowModal(true)}}
                    >
                    <Text style={{textAlign:'center', color: Colors.WHITE , fontFamily:'outfit-medium', fontSize: 15}}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType='slide'
                visible={showModal}
            >
                <BookingModal businessId={business.id} hideModal={() => setShowModal(false)}/>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'relative',
        flex: 1,
        bottom: 0
    },
    infoContainer: {
        padding: 20,
        display: 'flex',
        gap: 6
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    backBtnContainer: {
        position: 'absolute',
        top: 10,
        zIndex: 10,
        padding: 10,
    },
    messageBtn: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    },
    bookBtn: {
        padding: 10,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    }
});