import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from "react-native";

const Card = ({ style, onPress, children, ...props }) => {
    const Container = onPress ? TouchableHighlight : View;
    const containerProps = onPress
        ? {
            onPress,
            underlayColor: "#f0f0f0",
            activeOpacity: 0.9, // Added for better feedback
        }
        : {};

    return (
        <Container style={[styles.cardWrapper, style]} {...containerProps} {...props}>
            <View style={styles.card}>{children}</View>
        </Container>
    );
};

Card.Title = ({ children, style, ...props }) => (
    <Text style={[styles.cardTitle, style]} {...props}>
        {children}
    </Text>
);

Card.Content = ({ children, style, ...props }) => (
    <View style={[styles.cardContent, style]} {...props}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    cardWrapper: {
        width: "100%",
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    card: {
        padding: 16, // Moved padding here to prevent TouchableHighlight padding issues
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    cardContent: {},
});

export default Card;
