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

const selectImage = async () => {
    try {
        const result =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.mediaTypeOption.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        }
    }catch (error) {
        console.log("Error selecting Image:", error);
    }
};

export default CreatePstscreen;