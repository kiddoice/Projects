import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const savedUserName = await AsyncStorage.getItem('userName');
                if (savedUserName) {
                    setUserName(savedUserName); // Set the username from AsyncStorage
                }
            } catch (error) {
                console.error('Error fetching username', error);
            }
        };

        fetchUserName();
    }, []);

    const handleStartGame = () => {
        // Logic for starting the game (e.g., navigate to the game screen or perform any action)
        console.log('Game Started');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WELCOME {userName || 'Guest'}!</Text>  {/* Display username */}
            <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                <Text style={styles.startButtonText}>START</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1F1', // Light background color
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
    startButton: {
        backgroundColor: 'tomato',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    startButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
