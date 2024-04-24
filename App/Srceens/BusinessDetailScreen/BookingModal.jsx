import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import CalendarPicker from "react-native-calendar-picker";
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../Components/BackButton'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-react';

export default function BookingModal({businessId, hideModal}) {

    const [timeList, setTimeList] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const {user} = useUser();

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
            timeList.push({time: i+":00 PM"});
            timeList.push({time: i+":30 PM"});
        }
        for (let i=1; i<=5; i++)
        {
            timeList.push({time: i+":00 PM"});
            timeList.push({time: i+":30 PM"});
        }
        setTimeList(timeList);
    }


    const creeateBooking=()=>{

        if(!selectedDate || !selectedTime)
        {
            ToastAndroid.show("Please select date and time", ToastAndroid.LONG)
            return;
        }
        const data = {
            businessId: businessId,
            date: format(selectedDate, 'dd-MM-yyyy'), // Replace 'yyyy-MM-dd' with your desired date format,
            time: selectedTime,
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress
        }
        GlobalApi.createBooking(data).then((resp)=>{
            console.log("Response: ",resp),
            ToastAndroid.show("Booking Successful", ToastAndroid.LONG)
            hideModal();
        })
    }

    
    return (

        <ScrollView>
            <KeyboardAvoidingView style={{padding:15}} enabled >

                <TouchableOpacity 
                    style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', marginBottom:15}}
                    onPress={()=>hideModal()}
                >
                    <Ionicons name="chevron-down" size={24} color="black" />
                    <Text style={{fontSize:23, fontFamily:'outfit-medium'}}>Booking</Text>
                </TouchableOpacity>

                <Heading text={'Select Date'} />

                {/* Calandar Section */}

                <View style={styles.headingContainer}>
                    <CalendarPicker 
                        onDateChange={setSelectedDate}
                        width={320}
                        minDate={Date.now()}
                        todayBackgroundColor={Colors.BLACK}
                        todayTextStyle={{color:Colors.WHITE}}
                        selectedDayTextColor={Colors.WHITE}
                        selectedDayColor={Colors.PRIMARY}

                    />
                </View>

                {/* Time Section */}

                <View style={{marginTop:15}}>
                    <Heading text={'Select Time Slot'} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>(
                            <TouchableOpacity 
                                style={{marginRight:10}}
                                onPress={()=>setSelectedTime(item.time)}
                            >
                                <Text style={[selectedTime==item.time?styles.selectedTime:styles.unSelectedTime]}>{item.time}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Note Section */}

                <View style={{marginTop:15}}>
                    <Heading text={'Any Thing to Note'}/>
                    <TextInput
                        onChange={(()=>setNote())}
                        style={styles.note} 
                        placeholder='Type here'
                        placeholderTextColor={Colors.GREY}
                        multiline={true}
                        numberOfLines={5}
                    />
                </View>

                {/* Confirmation Button */}

                <View>
                <TouchableOpacity 
                        style={{marginTop:15}}
                        onPress={()=>creeateBooking()}
                        >
                        <Text style={styles.confirmBtn}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headingContainer:{
        padding:15,
        backgroundColor:Colors.PRIMARY_LIGHT,
        borderRadius:15
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