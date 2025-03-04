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

};

return (

    <SafeAreaView style={style.containers}>
        <KeyboardAvoidingView behavour={Platform.os === "ios" ? "Padding" : "height"} style={StyleSheet.KeyboardAvoidingView}>

            {/*Header Section */}
            <View style={StyleSheet.header}>
                <Text style={StyleSheet.headerTitle}>Create Post</Text>
            </View> 

            <ScrollView style={style.ScrollView}>
                {/*title Input Section */}
                <TextInput
                    ref={titleInputRef}
                    style={StyleSheet.titleInput}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    maxLength={100}
                />

                {/* Body Text Input Section */}
                <TextInput
                    style={styles.bodyInput}
                    placeholder="Write your post here..."
                    value={bodyText}
                    onChangeText={setBodyText}
                    multiline
                    textAlignVertical="top"
                />


                {/* Image Preview Section (only visible if an image is selected) */}
                {selectedImage && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                        {/* Remove Image Button */}
                        <TouchableOpacity style={styles.removeImageButton} onPress={() => setSelectedImage(null)}>
                            <Ionicons name="close-circle" size={24} color="#FF4D4D" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Add Image Button */}
                <TouchableOpacity style= {styles.addImageButton} onPress= {selectImage}>
                    <Ionicons name= "image-outline" size={24} color= "#4E8DF5"/>
                    <Text style= {styles.addImageText}>Add Image</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Submit Button Section */}
            <View style={styles.footer}>
                <TouchableOpacity
                style={[
                    styles.postButton,
                    !title.trim() || !bodyText.trim() || selectedCommunities.length === 0 ? styles.postButtonDisabled : {},
                  ]}
                  onPress={handlePost}
                  disabled={!title.trim() || !bodyText.trim() || selectedCommunities.length === 0}

                >
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
);


export default CreatePstscreen;