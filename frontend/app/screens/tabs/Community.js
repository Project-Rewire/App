import React from "react";
import { View,} from "react-native";
import Card from "../../fragments/card";

export default function Community() {
    return (
        <View style={{ padding: 10, borderRadius: 20 }}>
            <Card onPress={() => console.log("Card Pressed")}>
                <View >
                    <Card.Title>ReWire Community</Card.Title>
                </View>
            </Card>
        </View>
    );
}

