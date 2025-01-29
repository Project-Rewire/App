import React, { useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";

import { useRebot } from "../../hooks/rebot/rebot-service"; // Fixed typo in "hooks"

export default function ReBot() {
    const { messages, setMessages } = useRebot();

    const user = {
        _id: 2,
        name: 'sample user',
        avatar: 'https://placeimg.com/140/140/any',
    };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, [setMessages]); // Added setMessages as a dependency

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                renderAvatar={() => null} // Fixed renderAvatar to properly return null
                renderUsernameOnMessage={false}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolBar}
                renderSend={renderSend}
            />
        </View>
    );
}

const renderInputToolBar = (props) => {
    return (
        <View style={{
            backgroundColor: '#eee',
            paddingHorizontal: 4,
            paddingVertical: 8,
        }}>
            <InputToolbar
                {...props}
                containerStyle={{
                    borderTopWidth: 0,
                    borderRadius: 32,
                    backgroundColor: "#f2f8fc",
                    paddingHorizontal: 8,
                }}
            />
        </View>
    );
};

const renderSend = (props) => {
    return (
        <Send {...props}>
            <View style={{ marginBottom: 11, marginRight: 10, borderWidth: 0 }}>
                <Icon name="send" size={20} color="#0075FD" />
            </View>
        </Send>
    );
};

const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: "#f2f8fc",
                    padding: 8,
                    borderRadius: 24
                },
                right: {
                    backgroundColor: "#1790bd",
                    padding: 8,
                    borderRadius: 24
                },
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
