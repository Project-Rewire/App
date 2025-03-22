import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Profile = () => {
  const username = "Andrew Mark";
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarContainer}>
             <Image
              source={{ uri: `https://avatar.iran.liara.run/username?username=${username}` }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.username}>{username}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={16} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      {/*Menu Card*/}





