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
            {/* Menu Card */}
            <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="file-text" size={24} color="#fff" />
          <Text style={styles.menuItemText}>Your Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="help-circle" size={24} color="#fff" />
          <Text style={styles.menuItemText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="settings" size={24} color="#fff" />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="log-out" size={24} color="#fff" />
          <Text style={styles.menuItemText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3BCC2',
  },
  profileCard: {
    backgroundColor: '#454B54',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'lightblue',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 120,
  },
  editButtonText: {
    color: 'white',
    marginLeft: 6,
  },
  menuCard: {
    backgroundColor: '#454B54',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  }
});
export default Profile;








         






