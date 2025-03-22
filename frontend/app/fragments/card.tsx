import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from "react-native";
import { useTheme } from "@react-navigation/native";

export default function Card({
    style,
    onPress,
    onLongPress,
    children,
    borderRadius = 16,
    borderWidth = 0,
    borderColor = "transparent",
    shadow = false,
    padding = 4,
    margin = 0,
    backgroundColor,
    activeOpacity = 0.6,
    underlayColor,
    ...props
}) {
    const { colors } = useTheme();
    backgroundColor = backgroundColor ? backgroundColor : colors.card;
    underlayColor = underlayColor ? underlayColor : backgroundColor;
    const Container = onPress ? TouchableHighlight : View;
    const containerProps = onPress
        ? {
            onPress,
            onLongPress,
            underlayColor,
            activeOpacity,
        }
        : {};
    const cardStyles = [
        styles.cardWrapper,
        {
            borderRadius,
            borderWidth,
            borderColor,
            padding,
            margin,
            backgroundColor,
            ...(shadow && styles.shadow),  // Conditionally apply shadow
        },
        style,
    ];


    return (
        <Container style={cardStyles} {...containerProps} {...props} >
            <View style={[styles.card, { padding }]}>
                {children}
            </View>
        </Container>
    );
};

Card.Title = ({ children, style, color = "#333", fontSize = 18, ...props }) => (
    <Text style={[styles.cardTitle, { color, fontSize }, style]} {...props}>
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
        borderRadius: 16,
    },
    card: {
        padding: 4,
    },
    cardTitle: {
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardContent: {},
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4, // for Android
    },
});