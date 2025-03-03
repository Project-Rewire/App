import React from "react";
import { View, Image, StyleSheet, Text} from "react-native";
import Card from "../../fragments/card";

// Main community card(ReWire Community)
export default function Community() {
    return (
        <View style={{ padding: 10, borderRadius: 20 }}>
            <Text style={styles.text}>Main Community</Text>
            <Card onPress={() => console.log("Card Pressed")}>
                <View style={styles.titleContainer}>
                    <Image source={require('../../assets/rewire-logo.png')}
                        style={styles.image} />
                    <Card.Title>ReWire Community</Card.Title>
                    
                </View>
            </Card>
            <Text style={styles.text}>Joined Community</Text>
            <Card onPress={() => console.log("Card Pressed")}>
                <View style={styles.titleContainer}>
                    <Image source={require('../../assets/rewire-logo.png')}
                        style={styles.image} />
                    <Card.Title>Braking Habits</Card.Title>
                    
                </View>
            </Card>
            <Card onPress={() => console.log("Card Pressed")}>
                <View style={styles.titleContainer}>
                    <Image source={require('../../assets/rewire-logo.png')}
                        style={styles.image} />
                    <Card.Title>Fight For Freedom</Card.Title>
                    
                </View>
            </Card>
             <Text style={styles.text}>Suggestions</Text>

             <Card onPress={() => console.log("Card Pressed")}>
                <View style={styles.titleContainer}>
                    <Image source={require('../../assets/rewire-logo.png')}
                        style={styles.image} />
                    <Card.Title>Rise from Darkness</Card.Title>
                    
                </View>
            </Card>
            <Card onPress={() => console.log("Card Pressed")}>
                <View style={styles.titleContainer}>
                    <Image source={require('../../assets/rewire-logo.png')}
                        style={styles.image} />
                    <Card.Title>Better Future Together</Card.Title>
                    
                </View>
            </Card>
             
        </View>
    );
}

// Card stylesheet
const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: "green",
        borderWidth: 2,  
     },
     text: {
        color: "grey",
        fontSize: 14,
        paddingLeft: 5,
        paddingBottom: 15,
        textAlign: "left",
     },
    });


