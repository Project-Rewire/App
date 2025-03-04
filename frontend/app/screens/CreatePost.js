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

const styles = StyleSheet.create({
    container: { flex:1, backgroundColor: "#fff"},
    KeyboardAvoidingView: { flex: 1},

    header: { height: 60, borderBottomWidth: 1, borderBottomColor: "#E0E0E0", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
    headerTitle: {fontsize: 18, fontWeight: "bold"},

    scrollview: {flex: 1, padding: 16},

    titleInput: {borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, padding: 12, fontSize: 16, margingBottom: 16},

    bodyInput: {borderWidth:1, borderColor: "#E0E0E0", borderRadius: 8, padding: 12, fontSize: 16, minHeight: 150, MarinBottom: 16},

    addImageButton: {flexDirection: "row", alignItems: "center", backgroundColor: "#F6F8FA", borderradius: 8, padding: 12, marginBottom: 16},
    addImageText: {margineLeft: 8, color: "#4E8Df5" },

    imagePreviewContainer: {marginBottom: 16, position: "relative"},
    imagePreview: {width: "100", height: 200, borderRadius: 8},

    removeImageButton: {position: "absolute", top: 8, right: 8},

    footer: {padding:16, borderTopWidth: 1, bordertopColor: "E0E0E0", alignItems: "flex-end"},

    postButton: { backgroundColor: "#4E8DF5", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 },
    postButtonDisabled: { backgroundColor: "#BDBDBD" },
    postButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },


});


export default CreatePstscreen;