import { Text, View, StyleSheet } from "react-native";

export default function TermsAndConditions() {
    return (
        <View style={styles.container}>
            <Text>Terms & Conditions</Text>
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