import 'react-native-gesture-handler';import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import * as SecureStore from "expo-secure-store";
import Login from './App/Srceens/LoginScreen/Login';
import TabNavigation from "./App/Navigation/TabNavigation";


const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {

  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_cXVhbGl0eS1hcmFjaG5pZC0xMC5jbGVyay5hY2NvdW50cy5kZXYk'}>
      <SafeAreaView style={styles.container}>
        {/* SIgn OUT */}
        <SignedIn>
        <NavigationContainer>
          <TabNavigation/>
        </NavigationContainer>
        </SignedIn>

        {/* Sign In */}
        <SignedOut>
          <Login/>
        </SignedOut>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
    backgroundColor: '#fff',
    paddingTop: 20
  },
});
