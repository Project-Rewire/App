import { StyleSheet, View, Image } from "react-native";

export default function Splash() {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require("../assets/rewire-slogan-logo.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        width: 250,
        height: "100%",
        resizeMode: "contain" 
    }
});