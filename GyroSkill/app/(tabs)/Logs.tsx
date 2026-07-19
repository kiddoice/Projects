import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogsScreen() {
    const [usernames, setUsernames] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const savedUsernames = await AsyncStorage.getItem('usernames');
                if (savedUsernames) {
                    setUsernames(JSON.parse(savedUsernames)); // Set the usernames to state
                }
            } catch (error) {
                console.error('Error fetching usernames', error);
            }
        };

        fetchUsernames();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usernames History:</Text>
            <ScrollView style={styles.scrollContainer}>
                {usernames.length > 0 ? (
                    usernames.map((name, index) => (
                        <Text key={index} style={styles.usernameText}>
                            {name}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noLogs}>No usernames entered yet</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    scrollContainer: { width: '100%' },
    usernameText: { fontSize: 18, paddingVertical: 5 },
    noLogs: { fontSize: 18, color: 'gray' },
});
