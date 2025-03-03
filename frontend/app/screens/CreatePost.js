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

const handlePost = () => {
    if (!title.trim()) {
        alert("Please enter a title for your post");
        return;
    }
    if(!bodyText.trim()) {
        alert("Please Enter content for your Post");
        return;
    }
    if(selecteedCommunties.length === 0) {
        alert("Please select at least one community");
        return;
    }

    const post = {
        title,
        body: bodyText,
        image: selectImage,
        communtites: selecteedCommunties,
        timestamp: new Date().toISOString(),
    };

    console.log("Create post: ", post);
    alert("Post created successfully!");
    router.back();

}

export default CreatePstscreen;