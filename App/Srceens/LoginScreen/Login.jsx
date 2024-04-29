import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import Colors from '../../Utils/Colors'
import SplashScreen from './SplashScreen'; // Import the SplashScreen component

WebBrowser.maybeCompleteAuthSession();

export default function Login() {

    useWarmUpBrowser();

    const [showSplashScreen, setShowSplashScreen] = useState(false); // Add state to manage splash screen visibility

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
            if (createdSessionId) {
                setActive({ session: createdSessionId });
                setShowSplashScreen(true); // Show splash screen after successful login
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View style={{alignItems:'center'}}>
            {showSplashScreen ? ( // Render the splash screen if visible
                <SplashScreen visible={showSplashScreen} onClose={() => setShowSplashScreen(false)} />
            ) : (
                <>
                          <Image source={require('../../../assets/images/login_image.jpg')}
                      style={styles.LoginImage}
                  />
                  <View style={styles.SubContainer}>
                      <Text style={{ fontSize:22, color:Colors.WHITE, textAlign:'center'}}>
                          Let's Find 
                          <Text style={{fontWeight:'bold'}}> Professional Cleaning and Repair
                          </Text> Service
                      </Text>
                      <Text style={{fontSize:14, color:Colors.WHITE, textAlign:'center', marginTop:20}}>Best App to find services near you which deliver you a professional service.
                      </Text>

                      <TouchableOpacity style={styles.Button} onPress={onPress}>
                          <Text style={{ fontSize:14, color:Colors.PRIMARY, textAlign:'center'}}> Let's Get Started</Text>
                      </TouchableOpacity>
                  </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    LoginImage:{
        width:230,
        height:450,
        marginTop:70,
        borderWidth:4,
        borderColor:Colors.BLACK,
        borderRadius:15
    },
    SubContainer:{
        padding:20,
        width:'100%',
        backgroundColor: Colors.PRIMARY,
        height:'70%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    Button: {
        padding: 15,
        backgroundColor:Colors.WHITE,
        borderRadius:100,
        marginTop:40,
    }
})