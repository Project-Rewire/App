import { Text, View, StyleSheet } from "react-native";

// Sample Code

export default function Tasks() {
    return (
        <View style={styles.container}>
            <Text>Tasks Screen</Text>
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