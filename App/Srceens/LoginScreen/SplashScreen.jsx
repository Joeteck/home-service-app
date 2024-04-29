import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
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
                <Svg
                    style={styles.svg}
                    width={100}
                    height={100}
                >
                    <Circle
                        cx={50}
                        cy={50}
                        r={40}
                        fill="none"
                        strokeWidth={4}
                        stroke="#fff"
                        strokeDasharray={200}
                        strokeDashoffset={100}
                        strokeLinecap="round"
                    />
                </Svg>
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
    svg: {
        backgroundColor: 'transparent',
    },
});