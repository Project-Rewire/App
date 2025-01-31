import React, { useCallback } from "react";
import { View } from "react-native";
import { GiftedChat, Bubble, InputToolbar, Send, SystemMessage } from "react-native-gifted-chat";
import { useRebot } from "../../hooks/rebot-service";
import { Icon } from "../../fragments/icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ReBot() {
    const { messages, setMessages } = useRebot();
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
        <View style={{ flex: 1, marginBottom: insets.bottom }}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                renderAvatar={() => null}
                renderUsernameOnMessage={false}
                alwaysShowSend={false}
                isKeyboardInternallyHandled={true}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolBar}
                renderSend={renderSend}
                renderSystemMessage={renderSystemMessage}
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
        }}>
            <InputToolbar
                {...props}
                containerStyle={{
                    margin: 8,
                    borderTopWidth: 0,
                    borderRadius: 10,
                    paddingHorizontal: 4,
                    borderWidth: 1,
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                    borderTopColor: '#ccc',
                }}
            />
        </View>
    );
};

const renderSend = (props) => {
    return (
        <View>
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                <Icon
                    name="send-outline"
                    type="ionicon"
                    color="#888"
                    size={25}
                    style={{
                        padding: 4
                    }}
                />
            </Send>
        </View>
    );
};

const renderBubble = (props) => {
    return (
        <Bubble {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#ccc",
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: 12,
                    borderEndEndRadius: 0,
                },
                left: {
                    backgroundColor: "#268a4a33",
                    padding: 8,
                    borderRadius: 12,
                    borderTopStartRadius: 0,
                },
            }}
            textStyle={{
                left: {
                    color: '#000'
                },
                right: {
                    color: '#000'
                }
            }}
            timeTextStyle={{
                left: { display: 'none' },
                right: { display: 'none' }
            }}
        />
    );
};
