import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, StyleSheet, Alert } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { initializeDb, getConversations, deleteConversation, createConversation } from "../app.db.service";
import { H1 } from "../fragments/heading";
import { ListItem } from "@rneui/base";
import Card from "../fragments/card";
import { Icon } from "../fragments/icon";

export default function RebotChatSelection() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { colors } = useTheme();

    useEffect(() => {
        const setupDb = async () => {
            try {
                const success = await initializeDb();
                if (!success) {
                    console.warn("Database initialization may have failed");
                    return;
                }
                loadConversations();
            } catch (error) {
                console.error("Failed to initialize database:", error);
            }
        };

        setupDb();
    }, []);

    const loadConversations = async () => {
        setLoading(true);
        try {
            const conversations = await getConversations({
                onError: (error) => {
                    Alert.alert("Error occurred while loading conversations");
                }
            });
            setConversations(conversations || []);
        } catch (error) {
            Alert.alert("Error occurred while loading the conversation");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) {
            return "Just now";
        } else if (diffMins < 60) {
            return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
        } else if (diffDays < 30) {
            return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
        } else {
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        }
    };

    const handleSelectConversation = (conversationId) => {
        navigation.navigate("RebotChatInterface", { conversationId });
    };

    const handleConversationLongPress = (conversationId) => {
        Alert.alert(
            "Delete Conversation",
            "Are you sure you want to delete this conversation?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteConversation(conversationId, () => {
                                Alert.alert('Error occurred while deleting the conversation');
                            });
                            loadConversations(); // Refresh the list after deletion
                        } catch (error) {
                            console.error("Failed to delete conversation:", error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleNewConversation = () => {
        const generateRandomString = (length) => {
            const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
                result += lowercaseLetters[randomIndex];
            }
            return result;
        };
        const conversationId = generateRandomString(5);
        try {
            // Create a new conversation in the database
            createConversation({
                conversation: {
                    id: conversationId,
                    created_at: new Date().toISOString(),
                },
                onError: (error) => {
                    console.error('Error creating conversation:', error);
                    Alert.alert('Error', 'Failed to create a new conversation.');
                    return;
                },
            });

            // Navigate to the chat interface with the new conversationId
            navigation.navigate('RebotChatInterface', { conversationId });
        } catch (error) {
            console.error('Error handling new conversation:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text>Loading conversations...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <H1>Your Conversations</H1>

            {conversations.length === 0 ? (
                <View style={styles.emptyState}>
                    <Icon type="ionicon" name="chatbubble-outline" size={48} color="#666" />
                    <Text style={styles.emptyStateText}>No conversations yet</Text>
                    <TouchableHighlight
                        style={styles.newChatButton}
                        underlayColor={colors.highlight}
                        onPress={() => navigation.navigate("NewChat")}
                    >
                        <Text style={styles.newChatButtonText}>Start a New Chat</Text>
                    </TouchableHighlight>
                </View>
            ) : (
                <>
                    {/* Conversations List */}
                    <FlatList
                        data={conversations}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                onPress={() => handleSelectConversation(item.id)}
                                onLongPress={() => handleConversationLongPress(item.id)}
                                underlayColor={colors.highlight}
                            >
                                <ListItem
                                    bottomDivider
                                    containerStyle={{ backgroundColor: colors.card, borderColor: colors.border }}
                                >
                                    <ListItem.Content style={styles.listItem}>
                                        <ListItem.Title style={{ color: colors.text }}>
                                            Conversation {item.id.substring(0, 8)}
                                        </ListItem.Title>
                                        <ListItem.Subtitle style={[styles.listItemSubTitle, { color: colors.text }]}>
                                            {formatDate(item.created_at)}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron color={colors.text} />
                                </ListItem>
                            </TouchableHighlight>
                        )}
                    />

                    {/* Floating Button */}
                    <Card
                        style={[styles.floatingButton, { backgroundColor: colors.primary }]}
                        onPress={handleNewConversation}
                    >
                        <Card.Content>
                            <Icon type='ionicon' name='chatbubble' color={colors.background} />
                        </Card.Content>
                    </Card>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flexGrow: 1,
    },
    listItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 8
    },
    listItemSubTitle: {
        opacity: 0.5
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyStateText: {
        fontSize: 18,
        color: "#666",
        marginBottom: 24,
    },
    newChatButton: {
        backgroundColor: "#2196F3",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    newChatButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
    floatingButton: {
        position: "absolute",
        right: 24,
        bottom: 24,
        borderRadius: 24,
        padding: 12,
    },
});