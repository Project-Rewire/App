import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeDb, getConversations } from "../app.db.service";

export default function RebotChatSelection() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const setupDb = async () => {
            try {
                const success = await initializeDb();
                if (!success) {
                    console.warn("Database initialization may have failed");
                    return;
                }

                // Load conversations after db is initialized
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
            const convos = await getConversations({
                onError: (error) => console.error("Error fetching conversations:", error)
            });
            setConversations(convos || []);
        } catch (error) {
            console.error("Failed to load conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    // Format date without using date-fns
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        // Calculate time difference in milliseconds
        const diffMs = now - date;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        // Format based on the time difference
        if (diffSecs < 60) {
            return "just now";
        } else if (diffMins < 60) {
            return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffDays < 30) {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
        } else {
            // Format as MM/DD/YYYY
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        }
    };

    const handleSelectConversation = (conversationId) => {
        // Navigate to RebotChatInterface with the conversationId as a parameter
        navigation.navigate("RebotChatInterface", { conversationId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => handleSelectConversation(item.id)}
        >
            <Text style={styles.conversationTitle}>
                Conversation {item.id.substring(0, 8)}
            </Text>
            <Text style={styles.conversationDate}>
                {formatDate(item.created_at)}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text>Loading conversations...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Conversations</Text>

            {conversations.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No conversations yet</Text>
                    <TouchableOpacity
                        style={styles.newChatButton}
                        onPress={() => navigation.navigate("NewChat")}
                    >
                        <Text style={styles.newChatButtonText}>Start a New Chat</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={conversations}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />

                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => navigation.navigate("NewChat")}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // Styles remain unchanged
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    list: {
        flexGrow: 1,
    },
    conversationItem: {
        backgroundColor: "white",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    conversationTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    conversationDate: {
        marginTop: 4,
        fontSize: 14,
        color: "#666",
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
        backgroundColor: "#2196F3",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.41,
        elevation: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});