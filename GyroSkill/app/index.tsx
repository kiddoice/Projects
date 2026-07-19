import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartScreen() {
    const [userName, setUserName] = useState('');
    const router = useRouter();

    const handleNameSubmit = async () => {
        if (userName.trim() === '') {
            Alert.alert('Please enter a name!');
            return;
        }

        try {
            // Save the entered username in AsyncStorage
            await AsyncStorage.setItem('userName', userName);

            // Add the username to the list of previous usernames
            const usernames = await AsyncStorage.getItem('usernames');
            const usernamesArray = usernames ? JSON.parse(usernames) : [];

            usernamesArray.push(userName);

            // Save the updated usernames list back to AsyncStorage
            await AsyncStorage.setItem('usernames', JSON.stringify(usernamesArray));

            // Redirect to the Home tab after the name is entered
            router.replace('/(tabs)/Home');
        } catch (error) {
            console.error('Error saving username', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>Enter Your Name:</Text>
            <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="Your Name"
                autoFocus
            />
            <TouchableOpacity style={styles.button} onPress={handleNameSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
    prompt: { fontSize: 20, marginBottom: 20 },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'tomato',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
