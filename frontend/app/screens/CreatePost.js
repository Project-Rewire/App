import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const CreatePstscreen = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <View Style={styles.header}>
                <Text Style={style.headerTitle}> Create Post </Text> 
            </View>
        </SafeAreaView>
    );
};

const styles = styleSheet.create({
    container: { flex: 1, backgroungColor: "#fff"},
    header: {height: 60, justifyContent: "center", alignItems: "center"},
    headerTitle: { fontSize: 18, fontWeight: "bold"},
});

export default CreatePstscreen;