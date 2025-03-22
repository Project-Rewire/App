import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const CreateCommunity = () => {
    // State management for form  inputs
    const [communityName, setCommunityName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [category, setCategory] = useState('');

    const nameInputRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            if(nameInputRef.current) {
                nameInputRef.current.focus();
            }
        },100);
    }, []);

  // Function to handle icon selection
  const selectIcon = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1, // High quality
    });

    if (!pickerResult.canceled) {
      // Set the selected image URI
      setSelectedIcon(pickerResult.assets[0].uri);
    }
  };
   
   const handleCreateCommunity = () => {
    // Validation checks for required fields
    if (!communityName.trim()) {
      alert("Please enter a name for your community");
      return;
    }
    
    if (!description.trim()) {
      alert("Please enter a description for your community");
      return;
    }
    
    if (!category.trim()) {
      alert("Please select a category for your community");
      return;
    }
    
    // Create community object with all form data
       const community = {
      name: communityName,
      description: description,
      icon: selectedIcon,
      category: category,
      createdAt: new Date().toISOString(),
    };
    
    // Log new community details and navigate back
    // In a real app, this would likely save to a database
    console.log("Creating community:", community);
    alert("Community created successfully!");
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingView}
      >
        {/* Header Section with back button and title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Community</Text>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView style={styles.scrollView}>
          {/* Icon Selection Section */}
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={selectIcon} style={styles.iconPicker}>
              {selectedIcon ? (
                <Image source={{ uri: selectedIcon }} style={styles.iconPreview} />
              ) : (
                <View style={styles.iconPlaceholder}>
                  <Text style={styles.iconPlaceholderText}>Add Icon</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Community Name Input */}
          <Text style={styles.inputLabel}>Community Name*</Text>
          <TextInput
            ref={nameInputRef}
            style={styles.input}
            placeholder="Enter community name"
            value={communityName}
            onChangeText={setCommunityName}
            maxLength={50}
          />
          
          {/* Description Input - Multiline text area */}
          <Text style={styles.inputLabel}>Description*</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="What is this community about?"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
          
          {/* Category Input */}
          <Text style={styles.inputLabel}>Category*</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g. Recovery, All adictions,only srceen addiction "
            value={category}
            onChangeText={setCategory}
          />
          
          {/* Private Community option has been removed */}
          
          {/* Community Guidelines/Rules Section */}
          <View style={styles.rulesSection}>
            <Text style={styles.rulesTitle}>Community Guidelines</Text>
            <Text style={styles.rulesText}>
              • Be respectful and supportive to other members
              {"\n"}• No spam or self-promotion
              {"\n"}• Keep discussions relevant to the community purpose
            </Text>
          </View>
        </ScrollView>
        
        {/* Create Button Section - Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.createButton,
              (!communityName.trim() || !description.trim() || !category.trim()) 
                ? styles.createButtonDisabled 
                : {}
            ]}
            onPress={handleCreateCommunity}
            disabled={!communityName.trim() || !description.trim() || !category.trim()}
          >
            <Text style={styles.createButtonText}>Create Community</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};         

// Styles definition and component export
const styles = StyleSheet.create({
  // Container and layout styles
  container: { 
    flex: 1, 
    backgroundColor: "#fff"
  },
  keyboardAvoidingView: { 
    flex: 1
  },
  header: { 
    height: 60, 
    borderBottomWidth: 1, 
    borderBottomColor: "#E0E0E0", 
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 16 
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  placeholder: {
    width: 40,
  },
  scrollView: { 
    flex: 1, 
    padding: 16 
  },

  // Icon section styles
  iconSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconPicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  iconPreview: {
    width: "100%",
    height: "100%",
  },
  iconPlaceholder: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlaceholderText: {
    fontSize: 14,
    color: "#4CAF50",
    textAlign: "center",
  },

  // Form input styles
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 16,
  },

  // Privacy section styles
  privacySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  privacyDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  // Rules section styles
  rulesSection: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  rulesText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
  },

  // Footer and button styles
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  createButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateCommunity;