import React from "react";
import PropTypes from "prop-types";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Button,
    Alert,
    Platform, // You need to import Platform for handling Android permissions
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location"; // Importing expo-location
import { MessageShape, createLocationMessage } from "../utils/MessageUtils";

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
    };

    static defaultProps = {
        onPressMessage: () => { },
    };

    // Optional: Local message state for demo
    state = {
        localMessages: this.props.messages,
    };

    // ✅ Adds a current location message
    handleAddLocationMessage = async () => {
        try {
            // Request location permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location permission is required.");
                return;
            }

            // Request background location permission for Android
            if (Platform.OS === "android") {
                const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus !== "granted") {
                    Alert.alert("Permission Denied", "Background location permission is required.");
                    return;
                }
            }

            // Get the current location
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            });

            const { latitude, longitude } = location.coords;

            const newMessage = createLocationMessage({ latitude, longitude });

            this.setState((prevState) => ({
                localMessages: [newMessage, ...prevState.localMessages],
            }));
        } catch (error) {
            Alert.alert("Location Error", error.message);
        }
    };

    // Request location permission as soon as the component is mounted
    async componentDidMount() {
        // Automatically request location permissions when the component is mounted
        await this.handleAddLocationMessage();
    }

    renderMessageItem = ({ item }) => {
        const { onPressMessage } = this.props;

        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    };

    renderMessageBody({ type, text, uri, coordinate }) {
        switch (type) {
            case "text":
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>{text}</Text>
                    </View>
                );
            case "image":
                return <Image style={styles.image} source={{ uri }} />;
            case "location":
                return (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coordinate,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.04,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        const { localMessages } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {/* Location Button for Testing */}
                <Button
                    title="Add My Location"
                    onPress={this.handleAddLocationMessage}
                    color="#007AFF"
                />
                <FlatList
                    style={styles.container}
                    inverted
                    data={localMessages}
                    renderItem={this.renderMessageItem}
                    keyExtractor={keyExtractor}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden",
    },
    messageRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginLeft: 60,
        marginBottom: 10,
    },
    messageBubble: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 15,
        maxWidth: "100%",
    },
    messageText: {
        color: "#fff",
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    map: {
        width: 200,
        height: 150,
        borderRadius: 10,
    },
});
