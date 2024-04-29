
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../Components/BackButton';
import Colors from '../../Utils/Colors'

export default function AboutScreen() {
    return (
        <View style={styles.container}>
        <BackButton text={'About Us'}/>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.sectionTitle}>Vision</Text>
        <Text style={styles.sectionText}>Our vision is to provide the best home services to our customers.</Text>
        <Text style={styles.sectionTitle}>Mission</Text>
        <Text style={styles.sectionText}>Our mission is to ensure that every customer has a great experience with our home services.</Text>
        <Text style={styles.sectionTitle}>Developer</Text>
        <Text style={styles.sectionText}>Joel is a skilled developer with expertise in React, React Native, Python, Software Development, SpringBoot, Backend, Data Structures, and Algorithms, Networking, and more.</Text>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.sectionText}>For any inquiries or concerns, please contact us at support@homeserviceapp.com.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 25,
    },
    heading: {
        fontSize: 25,
        fontFamily: 'outfit-bold',
        color: Colors.PRIMARY,
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'outfit-medium',
        color: Colors.PRIMARY,
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        fontFamily: 'outfit',
        color: Colors.BLACK,
        marginBottom: 10,
    },
});