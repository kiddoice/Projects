import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>HOW TO PLAY</Text>
                <Text style={styles.content}>
                    {/* Add the content for HOW TO PLAY */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut mauris eget libero fermentum tincidunt.
                    Nullam volutpat felis vitae libero auctor, vel varius erat aliquet.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>ABOUT GYROSKILL</Text>
                <Text style={styles.content}>
                    {/* Add the content for ABOUT GYROSKILL */}
                    Gyroskill is a fun and challenging game that allows users to test their skills in virtual environments.
                    With intuitive controls and immersive gameplay, it offers a unique experience for players.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',  // This will vertically center the content
        alignItems: 'center',      // Horizontally center the content
        padding: 20,
    },
    section: {
        marginBottom: 20,
        width: '100%', // Make sure the section uses full width
        alignItems: 'center', // Center text horizontally within each section
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        textAlign: 'center', // Ensures content is centered horizontally
        maxWidth: 500, // Optional: limit the width of content to make it look better on large screens
    },
});
