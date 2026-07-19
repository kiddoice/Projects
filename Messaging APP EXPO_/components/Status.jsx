import React from "react";
import Constants from "expo-constants";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default class Status extends React.Component {
    state = {
        isConnected: false,
        showConnectedMessage: false,
    };

    componentDidMount() {
        this.unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                this.setState({ isConnected: true, showConnectedMessage: true });
                setTimeout(() => {
                    this.setState({ showConnectedMessage: false });
                }, 3000);
            } else {
                this.setState({ isConnected: false });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        const { isConnected, showConnectedMessage } = this.state;
        const backgroundColor = isConnected ? "white" : "red";

        const statusBar = (
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? "dark-content" : "light-content"}
                animated={false}
            />
        );

        const messageContainer = (
            <View style={styles.messageContainer} pointerEvents="none">
                {statusBar}
                {!isConnected ? (
                    <View style={styles.bubbleRed}>
                        <Text style={styles.text}>No network connection</Text>
                    </View>
                ) : (
                    showConnectedMessage && (
                        <View style={styles.bubbleGreen}>
                            <Text style={styles.text}>Connected</Text>
                        </View>
                    )
                )}
            </View>
        );

        if (Platform.OS === "ios") {
            return (
                <View style={[styles.status, { backgroundColor }]}>
                    {messageContainer}
                </View>
            );
        }

        return messageContainer;
    }
}

// ✅ Fallback in case Constants.statusBarHeight is undefined
const statusHeight = Platform.OS === "ios" ? Constants.statusBarHeight || 20 : 0;

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight,
    },
    messageContainer: {
        zIndex: 1,
        position: "absolute",
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: "center",
    },
    bubbleRed: {
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    bubbleGreen: {
        backgroundColor: "green",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});
