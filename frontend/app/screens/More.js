import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { Text, View, StyleSheet } from "react-native";

// Sample Code

export default function More() {

    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Button title="Settings" onPress={() => { navigate("Settings") }} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    }
});