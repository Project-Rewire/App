import React, { useState, useEffect, useRef } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// State for handling title input, body text, storing selected images, and selected community.
const CreatePostScreen = () => {
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCommunities, setSelectedCommunities] = useState([]); 

    const titleInputRef = useRef(null);
    const router = useRouter();

    // Automatically focuses on the title input when the component mounts.
    useEffect(() => {
        setTimeout(() => {
            if (titleInputRef.current) {
                titleInputRef.current.focus();
            }
        }, 100);
    }, []);

    // Function to select an image from the gallery
    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log("Error selecting Image:", error);
        }
    };

    // Function to handle the post submission
    const handlePost = () => {
        if (!title.trim()) {
            alert("Please enter a title for your post");
            return;
        }
        if (!bodyText.trim()) {
            alert("Please enter content for your post");
            return;
        }
        if (selectedCommunities.length === 0) {
            alert("Please select at least one community");
            return;
        }

        const post = {
            title,
            body: bodyText,
            image: selectedImage,
            communities: selectedCommunities,
            timestamp: new Date().toISOString(),
        };

        // Creating post and navigating back after post creation.
        console.log("Created post:", post);
        alert("Post created successfully!");
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.KeyboardAvoidingView}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create Post</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {/* Title Input Section */}
                    <TextInput
                        ref={titleInputRef}
                        style={styles.titleInput}
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
                    <TouchableOpacity style={styles.addImageButton} onPress={selectImage}>
                        <Ionicons name="image-outline" size={24} color="#4E8DF5" />
                        <Text style={styles.addImageText}>Add Image</Text>
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Styling Component for UI
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    KeyboardAvoidingView: { flex: 1 },
    header: { height: 60, borderBottomWidth: 1, borderBottomColor: "#E0E0E0", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
    headerTitle: { fontSize: 18, fontWeight: "bold" },
    scrollView: { flex: 1, padding: 16 },
    titleInput: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16 },
    bodyInput: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, padding: 12, fontSize: 16, minHeight: 150, marginBottom: 16 },
    addImageButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#F6F8FA", borderRadius: 8, padding: 12, marginBottom: 16 },
    addImageText: { marginLeft: 8, color: "#4E8DF5" },
    imagePreviewContainer: { marginBottom: 16, position: "relative" },
    imagePreview: { width: "100%", height: 200, borderRadius: 8 },
    removeImageButton: { position: "absolute", top: 8, right: 8 },
    footer: { padding: 16, borderTopWidth: 1, borderTopColor: "#E0E0E0", alignItems: "flex-end" },
    postButton: { backgroundColor: "#4E8DF5", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 },
    postButtonDisabled: { backgroundColor: "#BDBDBD" },
    postButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default CreatePostScreen;
