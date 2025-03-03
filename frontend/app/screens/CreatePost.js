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
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [selectedImage, setSelectedImage] = useState (null);
    const [SelectCommunities, setSelectCommunities] = useState ([]); 
    
    const titleInputRef = useRef(null);
    const router = useRouter();
};

const styles = styleSheet.create({
    container: { flex: 1, backgroungColor: "#fff"},
    header: {height: 60, justifyContent: "center", alignItems: "center"},
    headerTitle: { fontSize: 18, fontWeight: "bold"},
});

export default CreatePstscreen;