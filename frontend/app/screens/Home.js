import { Text, View, StyleSheet } from "react-native";

// Sample Code

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
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