import React from 'react';
import { View, FlatList } from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import BusinessList from './BusinessList';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[1, 2, 3, 4, 5]} // Replace this with your actual data
        keyExtractor={(item) => item.toString()}
        style={{ marginTop: 5 }}
        renderItem={({ item }) => (
          <>
            {/* Header Component */}
            {item === 1 && <Header />}
            {/* Other Components */}
            <View style={{ padding: 20, paddingTop: 0 }}>
              {item === 2 && <Slider />}
              {item === 3 && <Categories />}
              {item === 4 && <BusinessList />}
            </View>
          </>
        )}
        // contentContainerStyle={{ paddingTop: 5 }}
      />
    </View>
  );
};

export default HomeScreen;