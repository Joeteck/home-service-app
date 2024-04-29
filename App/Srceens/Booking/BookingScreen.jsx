import { View, Text, FlatList, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading'
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem'

export default function BookingScreen() {
  const { user } = useUser();
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.GetUserBookings(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        setBooking(resp?.bookings);
        setLoading(false);
      }
    );
  };

  return (
    <View style={{ padding: 15, paddingTop: 25 }}>
      <Heading text={'My Bookings'} />
      {loading ? (
        <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', marginTop: '12%', textAlign: 'center', color: Colors.GREY }}>Loading...</Text>
      ) : booking.length === 0 ? (
        <Text style={{ fontSize: 20, fontFamily: 'outfit-medium', marginTop: '12%', textAlign: 'center', color: Colors.GREY }}>No Booking Yet</Text>
      ) : (
        <FlatList
          data={booking}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => (
            <BusinessListItem
              business={item?.business_List}
              booking={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={getUserBookings}
          refreshing={loading}
        />
      )}
    </View>
  );
}