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
        }
        : {};

    return (
        <Container
            style={[styles.cardWrapper, style]}
            {...containerProps}
            {...props}
        >
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
        backgroundColor: "white",
        borderRadius: 8,
        // Default shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        padding: 16,
        shadowRadius: 3.84,
        // Default shadow for Android
        elevation: 1,
    },
    card: {
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    cardContent: {
    },
});

export default Card;
