import React from 'react';
import { View, Modal, StyleSheet, Image } from 'react-native';
import Colors from '../../Utils/Colors';

export default function SplashScreen({ visible, onClose }) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={"none"}
            onRequestClose={onClose}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <View style={styles.container}>
                <Image
                    style={styles.icon}
                    source={require('../../../assets/icon.png')}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY_LIGHT,
    },
    icon: {
        width: 100,
        height: 100,
    },
});