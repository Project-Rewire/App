import { Text, View, StyleSheet } from "react-native";

// Sample Code

export default function Community() {
    return (
        <View style={styles.container}>
            <Text>Community Screen</Text>
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