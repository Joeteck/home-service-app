import { View, Text, TouchableOpacity, StyleSheet, FlatList, ToastAndroid, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CalendarPicker from "react-native-calendar-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-react';

export default function BookingModal({booking, hideModal}) {

    const [timeList, setTimeList] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Booked', value: 'Booked'}, {label: 'InProgress', value: 'InProgress'},
        {label: 'Completed', value: 'Completed'}
    ]);    
    const {user} = useUser();
    const business =  booking?.business_List;

    useEffect(()=>{
        getTime();
    }, [])
    const getTime =()=>{
        const timeList = [];
        for(let i=8; i<12; i++)
        {
            timeList.push({time: i+":00 AM"});
            timeList.push({time: i+":30 AM"});
        }
        for (let i=12; i<13; i++)
        {
            timeList.push({time: i+" noon"});
            timeList.push({time: i+":30 PM"});
        }
        for (let i=1; i<=5; i++)
        {
            timeList.push({time: i+":00 PM"});
            timeList.push({time: i+":30 PM"});
        }
        setTimeList(timeList);
    }


    const editBooking=()=>{

        if(!selectedDate || !selectedTime ||!value)
        {
            ToastAndroid.show("Please select date and time and status", ToastAndroid.LONG)
            return;
        }
        const data = {
            date: format(selectedDate, ' E dd-MMM-yyyy'), // Replace 'yyyy-MM-dd' with your desired date format,
            time: selectedTime,
            bookingStatus: value,
            id: booking.id
        }
        GlobalApi.EditBooking(data).then((resp)=>{
            ToastAndroid.show("Booking Successfully Edited", ToastAndroid.LONG)
            hideModal();
        })
    }

    
    return (

        <View>

        <TouchableOpacity 
            style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', position:'absolute', zIndex:10,paddingLeft:10, backgroundColor:Colors.LIGHTGREY, width:'100%' }}
            onPress={()=>hideModal()}
        >
            <Ionicons name="chevron-back" size={20} color="black" />
            <Text style={{fontSize:20, fontFamily:'outfit-medium', color:Colors.BLACK}}>Edit Booking</Text>
        </TouchableOpacity>


        {/* Business Details */}


            <FlatList
                data={[business]} // Assuming you want to render only one item, the business
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item?.images[0]?.url }}
                            style={{ width: '100%', height: 180 }}
                        />
                        <View style={{ padding: 15 }}>
                            <View style={styles.infoContainer}>
                                <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>{item?.name}</Text>
                                <View style={styles.subContainer}>
                                    <Text style={{ fontFamily: 'outfit', color: Colors.PRIMARY, fontSize: 16 }}>{item?.email}</Text>
                                </View>
                                <Text style={{ fontSize: 15, fontFamily: 'outfit', color: Colors.GREY }} numberOfLines={1} ellipsizeMode='tail'>
                                    <Ionicons name="location-sharp" size={18} color={Colors.PRIMARY} style={{ marginRight: 5 }} />
                                    {item?.address}
                                </Text>

                                {/* Horizontal Line */}
                                <View style={{ width: '100%', height: 0.5, backgroundColor: Colors.GREY, marginVertical: 10 }} />
                            </View>

                            {/* Calandar Section */}

                            <Heading text={'Select Date'} />

                            <View style={styles.headingContainer}>
                                <CalendarPicker
                                    onDateChange={setSelectedDate}
                                    width={300}
                                    minDate={Date.now()}
                                    todayBackgroundColor={Colors.BLACK}
                                    todayTextStyle={{ color: Colors.WHITE }}
                                    selectedDayTextColor={Colors.WHITE}
                                    selectedDayColor={Colors.PRIMARY}
                                />
                            </View>

                            {/* Time Section */}

                            <View style={{ marginTop: 15 }}>
                                <Heading text={'Select Time Slot'} />
                                <FlatList
                                    data={timeList}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={{ marginRight: 10 }}
                                            onPress={() => setSelectedTime(item.time)}
                                        >
                                            <Text style={[selectedTime == item.time ? styles.selectedTime : styles.unSelectedTime]}>{item.time}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            {/* Booking Status */}

                            <View>
                                <Heading text={'Booking Status'} />
                                <DropDownPicker
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    containerStyle={{
                                        backgroundColor: 'white',
                                        width: 150,
                                        height: 200
                                    }}
                                />
                            </View>

                            {/* Confirmation Button */}

                            <View>
                                <TouchableOpacity
                                    style={{ marginTop: 15 }}
                                    onPress={() => editBooking()}
                                >
                                    <Text style={styles.confirmBtn}>Confirm Changes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    headingContainer:{
        padding:15,
        backgroundColor:Colors.PRIMARY_LIGHT,
        borderRadius:15
    },
    infoContainer: {
        display: 'flex',
        gap: 6
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    selectedTime:{
        padding:6,
        borderWidth:1,
        borderColor: Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:16,
        color:Colors.WHITE,
        backgroundColor:Colors.PRIMARY
    },
    unSelectedTime:{
        padding:6,
        borderWidth:1,
        borderColor: Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:16,
        color:Colors.PRIMARY
    },
    note:{
        borderWidth:1, 
        borderColor:Colors.PRIMARY,
        textAlignVertical:'top',
        borderRadius:12,
        fontSize:15,
        padding:10,
        marginBottom:5
    },
    confirmBtn: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 15,
        color: Colors.WHITE,
        padding: 12,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        elevation: 5
    }
})