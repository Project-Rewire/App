import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";

const { height } = Dimensions.get("window");

import { useRebot } from "../../hookes/rebot/rebot-service";


export default function ReBot() {
    const { messages, setMessages } = useRebot();

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Chat with AI</Text>
            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                renderAvatar={null}
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
        <InputToolbar
            {...props}
            containerStyle={{
                borderRadius: 16,
                backgroundColor: "#f2f8fc",
                marginHorizontal: 8,
                marginTop: 5,
                borderTopWidth: 0,
            }}
        />
    );
};

const renderSend = (props) => {
    return (
        <Send {...props}>
            <View style={{ marginBottom: 11 }}>
                <Icon name="send" size={24} color="#0075FD" />
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
                },
                right: {
                    backgroundColor: "#0075FD",
                },
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingTop: height * 0.07,
        flexDirection: "row",
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        paddingVertical: 8,
        backgroundColor: "#f2f8fc",
    },
    heading: {
        fontWeight: "500",
        paddingLeft: 16,
        fontSize: 20,
    },
});