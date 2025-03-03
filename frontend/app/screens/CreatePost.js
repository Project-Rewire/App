import React, { useState, useEffect, useRef} from "react";
import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
} from "react-native";


import * as ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";


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