import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
    Alert,
    BackHandler,
} from "react-native";
import Status from "../components/Status";
import React from "react";
import {
    createImageMessage,
    createTextMessage,
    createLocationMessage,
} from "../utils/MessageUtils";
import MessageList from "../components/MessageList";
import Toolbar from "../components/Toolbar";

export default class Index extends React.Component {
    state = {
        messages: [
            createImageMessage("https://unsplash.it/300/300"),
            createTextMessage("World"),
            createTextMessage("Hello"),
            createLocationMessage({
                latitude: 37.78825,
                longitude: -122.4324,
            }),
        ],
        fullscreenImageId: null,
        isInputFocused: false, // specific code for act 11
    };


    // activity 10
    handleSubmit = (text) => {
        const { messages } = this.state;
        this.setState({
            messages: [createTextMessage(text), ...messages],
        });
    };

    handlePressMessage = ({ id, type }) => {
        switch (type) {
            case "text":
                Alert.alert(
                    "Delete Message",
                    "Are you sure you want to delete this message?",
                    [
                        { text: "Cancel" },
                        {
                            text: "Delete",
                            style: "destructive",
                            onPress: () => this.handleDeleteMessage(id),
                        },
                    ],
                    { cancelable: true }
                );
                break;
            case "image":
                this.setState({ fullscreenImageId: id });
                this.setState({ isInputFocused: false }); // specific code for act 11
                break;
            default:
                break;
        }
    };

    handleDeleteMessage = (id) => {
        this.setState((prevState) => ({
            messages: prevState.messages.filter((message) => message.id !== id),
        }));
        Alert.alert(
            "Message Deleted",
            "The message has been deleted successfully."
        );
    };

    renderFullscreenImage = () => {
        const { messages, fullscreenImageId } = this.state;
        if (!fullscreenImageId) return null;
        const image = messages.find(
            (message) => message.id === fullscreenImageId
        );
        if (!image) return null;
        const { uri } = image;
        return (
            <TouchableHighlight
                style={styles.fullscreenOverlay}
                onPress={this.dismissFullscreenImage}
            >
                <Image style={styles.fullscreenImage} source={{ uri }} />
            </TouchableHighlight>
        );
    };

    dismissFullscreenImage = () => {
        this.setState({ fullscreenImageId: null });
    };

    renderMessageList() {
        const { messages } = this.state;
        return (
            <View style={styles.content}>
                <MessageList
                    messages={messages}
                    onPressMessage={this.handlePressMessage}
                />
            </View>
        );
    }

    componentDidMount() {
        this.subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                const { fullscreenImageId } = this.state;
                if (fullscreenImageId) {
                    this.dismissFullscreenImage();
                    return true; // Prevent default behavior
                }
                return false;
            }
        );
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.remove();
        }
    }


    // activity 11
    handlePressToolbarCamera = () => {
        // ...
    };
    handlePressToolbarLocation = () => {
        // ...
    };
    handleChangeFocus = (isFocused) => {
        this.setState({ isInputFocused: isFocused });
    };
   

    render() {
        const { isInputFocused } = this.state;
        const { fullscreenImageId } = this.state;

        return (
            <View style={styles.container}>
                <Status />
                {this.renderMessageList()}
                {this.renderFullscreenImage()}

                {/* We dont render this if image full screen*/}
                {!fullscreenImageId && (
                    <Toolbar
                        isFocused={isInputFocused}
                        onSubmit={this.handleSubmit}
                        onChangeFocus={this.handleChangeFocus}
                        onPressCamera={this.handlePressToolbarCamera}
                        onPressLocation={this.handlePressToolbarLocation}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        // marginTop: 10,
        flexDirection: "row",
        backgroundColor: "white",
    },
    inputMethodEditor: {
        height: 50, // Explicit height
        backgroundColor: "white",
    },
    toolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16,
        backgroundColor: "white",
    },
    fullscreenOverlay: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullscreenImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
