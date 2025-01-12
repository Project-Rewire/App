import { Text, View, StyleSheet } from "react-native";

// Sample Code

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});