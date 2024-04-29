import { View, Text, TextInput, Linking, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import BackButton from '../../Components/BackButton'
import Colors from '../../Utils/Colors'


const HelpScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const sendEmail = () => {
        Linking.openURL(`mailto:${'adeyojuibukunoluwa1@gmail.com'}?subject=${subject}&body=Name:%0A${'This is message is coming from '+ name +' and I used this email: '+email}%0A%0AMessage:%0A${'Message:'+message}`)
    }

    const handleSend = () => {
        if (message.trim() === '') {
            Alert.alert('Message cannot be empty')
        } else {
            sendEmail()
        }
    }

    return (
        <View style={{padding:15, paddingTop:25}}>
            <BackButton text={'Help/Feedback'}/>
            <View>

                <TextInput
                    placeholder="Name (optional)"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.inputBox}
                />
                <TextInput
                    placeholder="Email (optional)"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.inputBox}
                />
                <TextInput
                    placeholder="Subject (optional)"
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    style={styles.inputBox}
                />
                <TextInput
                    placeholder="Write your message here"
                    value={message}
                    onChangeText={text => setMessage(text)}
                    multiline
                    numberOfLines={4}
                    style={styles.inputBox}
                />

                {/* Send Message Button */}

                <View>
                <TouchableOpacity
                        style={{marginTop:15}}
                        onPress={()=>handleSend()}
                        >
                        <Text style={styles.sendBtn}>Send Message</Text>
                    </TouchableOpacity>
                </View>            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 20,
        paddingTop: 50,

    },
    inputBox: {
        backgroundColor: Colors.BLACKLIGHT,
        textAlignVertical: 'top',
        color: Colors.LIGHTGREY,
        borderWidth: 1,
        borderColor: Colors.WHITE,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    messageBox: {
        borderWidth: 1,
        borderColor: Colors.WHITE,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
        maxHeight: 200,
    },
    sendBtn: {
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
export default HelpScreen