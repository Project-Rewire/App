import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../../fragments/card"
import { color } from "@rneui/base";

export default function HomeScreen() {
    return (
        <View style={{ padding: 8 }}>
            <Card onPress={() => console.log("Card Pressed")}>
                <Card.Title>Overall Progress</Card.Title>
                <Card.Content>
                    <Text>48% - Good</Text>
                </Card.Content>
            </Card>
            <Card onPress={() => console.log("Daily Task Pressed")}>
                <Card.Title>Daily Task</Card.Title>
                <Card.Content>
                    <Text>65% - Almost There</Text>
                </Card.Content>
            </Card>
            <Card style={{ backgroundColor: "#ee4421", color: "#fff", borderRadius: 32, padding: 32 }}>
                <Card.Title style={{ color: "#eee" }}>Achievements</Card.Title>
                <Card.Content>
                    <Text>Task 07 Completed - Day 7 Gold</Text>
                    <Text>7 Days Streak - 1st Streak</Text>
                </Card.Content>
            </Card>
        </View>
    );
}
