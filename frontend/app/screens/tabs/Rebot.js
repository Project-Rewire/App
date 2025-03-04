import React, { useCallback, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { GiftedChat, Bubble, InputToolbar, Send, SystemMessage } from "react-native-gifted-chat";
import { useRebot } from "../../hooks/rebot-service";
import { Icon } from "../../fragments/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native";



export default function Rebot() {
    const [chatStarted, setChatStarted] = useState(false);

    if (chatStarted) {
        return <ChatInterface />;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#f5f5f5',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 20,
            color: '#333',
        },
        robotIcon: {
            width: "70%",
            height: 70,
            marginBottom: 20,
        },
        button: {
            backgroundColor: '#4a90e2',
            paddingHorizontal: 30,
            paddingVertical: 12,
            borderRadius: 8,
            marginTop: 10,
        },
        buttonText: {
            fontSize: 16,
            fontWeight: '600',
        }
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.robotIcon}
                source={require('../../assets/robot.png')}
                resizeMode="contain"
            />
            <Text style={styles.title}>Start a chat!</Text>
            <Button
                title="Start"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => setChatStarted(true)}
            />
        </View>
    );
}

function ChatInterface() {
    const { messages, setMessages, isLoading } = useRebot();
    const insets = useSafeAreaInsets();
    const user = {
        _id: 2,
        name: 'sample user',
        avatar: 'https://placeimg.com/140/140/any',
    };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, [setMessages]);

    return (
        <View style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: '#F8F9FA' }}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                renderAvatar={() => null}
                renderUsernameOnMessage={false}
                alwaysShowSend={true}
                isKeyboardInternallyHandled={true}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolBar}
                renderSend={renderSend}
                renderSystemMessage={renderSystemMessage}
                placeholder="Type your message here..."
                isLoadingEarlier={isLoading}
                renderLoading={() => <ActivityIndicator size="large" color="#268a4a" />}
                isTyping={isLoading}
            />
        </View>
    );
}



const renderSystemMessage = (props) => {
    return (
        <SystemMessage
            {...props}
            textStyle={{
                color: '#333',
            }}
        />
    );
};

const renderInputToolBar = (props) => {
    return (
        <View style={{
            backgroundColor: 'transparent',
            marginHorizontal: 4,
        }}>
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#FFFFFF',
                    margin: 8,
                    borderTopWidth: 0,
                    borderRadius: 24,
                    paddingHorizontal: 12,
                    borderWidth: 1,
                    borderColor: '#E9ECEF',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                    padding: 4
                }}
            />
        </View>
    );
};

const renderSend = (props) => {
    return (
        <Send {...props}
            containerStyle={{
                justifyContent: 'center',
                padding: 4,
            }}
        >
            <Icon
                name="send"
                type="ionicon"
                color="#268a4a"
                size={20}
                style={{
                    padding: 4
                }}
            />
        </Send>
    );
};

const renderBubble = (props) => {
    return (
        <Bubble {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#268a4a",
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    borderRadius: 16,
                    borderBottomRightRadius: 4,
                    shadowOffset: { width: 0, height: 1 },
                    shadowColor: '#000',
                    shadowRadius: 2,
                    shadowOpacity: 0.1,
                    elevation: 1,
                },
                left: {
                    backgroundColor: "#FFFFFF",
                    padding: 12,
                    borderRadius: 16,
                    borderTopLeftRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 1,
                },
            }}
            textStyle={{
                left: {
                    color: '#212529'
                },
                right: {
                    color: '#FFFFFF'
                }
            }}
            renderTime={() => null}
        />
    );
};
