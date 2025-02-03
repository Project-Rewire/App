import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../../fragments/card"
import { color } from "@rneui/base";

export default function Home() {
    return (
        <View style={{ padding: 8 }}>
            <Card onPress={() => console.log("Card Pressed")}>
                <Card.Title>Card Title</Card.Title>
                <Card.Content>
                    <Text>This is some card content with default styling.</Text>
                </Card.Content>
            </Card>
            <Card style={{ backgroundColor: "#ee4421", color: "#fff", borderRadius: 32, padding: 32 }}>
                <Card.Title style={{ color: "#eee" }}>Custom Styled Card</Card.Title>
                <Card.Content>
                    <Text>
                        You can override default styles by passing custom style props.
                    </Text>
                </Card.Content>
            </Card>
        </View>
    );
}
