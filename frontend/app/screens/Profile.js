import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeToggle } from '../hooks/theme-service';
import Avatar from '../fragments/avatar';

const Profile = () => {
  const userName = "Andrew Mark";
  const navigation = useNavigation();
  const { isDark, colors } = useThemeToggle();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? colors.background : '#F5F7FA',
    },
    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginHorizontal: 16,
      marginTop: 20,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    userName: {
      color: isDark ? colors.text.primary : colors.text,
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 16,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(22, 131, 125, 0.2)' : 'transparent',
      borderWidth: 1,
      borderColor: isDark ? colors.primary : colors.border,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'flex-start',
    },
    editButtonText: {
      color: colors.primary,
      marginLeft: 6,
      fontWeight: '500',
    },
    menuCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemText: {
      color: isDark ? colors.text.primary : colors.text,
      fontSize: 16,
      marginLeft: 16,
      fontWeight: '500',
    },
    logoutText: {
      color: isDark ? colors.error : '#ff6b6b',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar
            name={userName}
            radius={26}
            backgroundColor='#74007a'
            color='#fff'
            borderColor='#74007a'
            opacity={0.9}
            onPress={() => navigation.navigate('ProfileNavigator', { screen: 'Profile' })}
          />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="file-text" size={24} color={colors.primary} />
          <Text style={styles.menuItemText}>Your Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="help-circle" size={24} color={colors.primary} />
          <Text style={styles.menuItemText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('SettingsNavigator', { screen: 'Settings' })}
        >
          <Feather name="settings" size={24} color={colors.primary} />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
          <Feather name="log-out" size={24} color={isDark ? colors.error : "#ff6b6b"} />
          <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;