import { Text, View, StyleSheet } from "react-native";

export default function PrivacyPolicy() {
    return (
        <View style={styles.container}>
            <Text>Privacy Policy</Text>
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