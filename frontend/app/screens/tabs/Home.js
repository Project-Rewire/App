import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Hi Nidarsa,</Text>
            <Text style={styles.welcomeSubtext}>Welcome back!</Text>
          </View>
          <View style={styles.streakContainer}>
            <MaterialCommunityIcons name="fire" size={22} color="#FF7700" />
            <Text style={styles.streakText}>5-day streak!</Text>
          </View>
        </View>

        {/* Quote Section */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "Your decision to kill your addiction will become a reality only if you 
            believe and reinforce the fact that you have the capacity to do it."
          </Text>
          <Text style={styles.quoteAuthor}>Osho Maharaj</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>Your Progress</Text>
        </View>

        {/* Progress Cards */}
        <View style={styles.progressCardsContainer}>
          {/* Overall Progress Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressCircle}>
                <View style={styles.progressArc} />
                <View style={styles.progressInnerCircle}>
                  <Text style={styles.progressPercentage}>48%</Text>
                  <Text style={styles.progressStatus}>Good</Text>
                </View>
              </View>
            </View>
            <Text style={styles.progressTitle}>Overall Progress</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>

          {/* Daily Task Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressCircle}>
                <View style={styles.dailyProgressArc} />
                <View style={styles.progressInnerCircle}>
                  <Text style={styles.progressPercentage}>65%</Text>
                  <Text style={styles.progressStatus}>Almost There</Text>
                </View>
              </View>
            </View>
            <Text style={styles.progressTitle}>Daily Task</Text>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>Achievements</Text>
        </View>

        {/* Achievement Cards */}
        <View style={styles.achievementsContainer}>
          {/* Task Completed Card */}
          <View style={styles.achievementCard}>
            <View style={styles.achievementIconContainer}>
              <View style={[styles.achievementIcon, styles.goldIcon]}>
                <MaterialCommunityIcons name="check-circle-outline" size={28} color="#FFD700" />
              </View>
            </View>
            <Text style={styles.achievementTitle}>Task 07</Text>
            <Text style={styles.achievementSubtitle}>Completed</Text>
            <View style={styles.achievementBadge}>
              <Text style={styles.achievementBadgeText}>Day 7 Gold</Text>
            </View>
          </View>

          {/* Streak Card */}
          <View style={styles.achievementCard}>
            <View style={styles.achievementIconContainer}>
              <View style={[styles.achievementIcon, styles.silverIcon]}>
                <MaterialCommunityIcons name="trophy-outline" size={28} color="#C0C0C0" />
              </View>
            </View>
            <Text style={styles.achievementTitle}>7 days</Text>
            <Text style={styles.achievementSubtitle}>Streak</Text>
            <View style={styles.achievementBadge}>
              <Text style={styles.achievementBadgeText}>1st Streak</Text>
            </View>
          </View>

          {/* Partially visible third card */}
          <View style={[styles.achievementCard, styles.partialCard]} />
        </View>
      </ScrollView>

      {/* Bottom Menu - Fixed at bottom */}
      <View style={styles.bottomMenuContainer}>
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.reportButton}>
              <FontAwesome5 name="clipboard-list" size={20} color="#666" />
              <Text style={styles.menuItemText}>Your Report</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.assistantButton}>
              <FontAwesome5 name="robot" size={20} color="#4A90E2" />
              <Text style={styles.menuItemText}>ReWire Assistant</Text>
            </View>
          </TouchableOpacity>
        </View>

       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 130, // Add padding to account for fixed bottom menu
  },
  // Welcome Section Styles
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF7700',
    marginLeft: 6,
  },
  // Quote Section
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
    color: '#333',
  },
  quoteAuthor: {
    fontSize: 15,
    color: '#888',
    textAlign: 'right',
  },
  sectionLabel: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionLabelText: {
    fontSize: 17,
    color: '#666',
    fontWeight: '500',
  },
  progressCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressCircleContainer: {
    marginBottom: 12,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressArc: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#4A90E2',
    borderRightColor: '#4A90E2',
    transform: [{ rotate: '-45deg' }],
  },
  dailyProgressArc: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#4A90E2',
    borderRightColor: '#4A90E2',
    borderBottomColor: '#4A90E2',
    transform: [{ rotate: '-90deg' }],
  },
  progressInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressStatus: {
    fontSize: 12,
    color: '#666',
  },
  progressTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#E8F0F7',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  achievementsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  achievementCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  partialCard: {
    opacity: 0.5,
  },
  achievementIconContainer: {
    marginBottom: 8,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
  },
  goldIcon: {
    backgroundColor: '#FFF9E6',
  },
  silverIcon: {
    backgroundColor: '#F5F5F5',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  achievementBadge: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  achievementBadgeText: {
    fontSize: 10,
    color: '#888',
  },
  // Bottom Menu Container to hold both buttons and navigation
  bottomMenuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F5F5F5',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  menuItem: {
    width: '48%',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  assistantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10,
  },
  
});

export default HomePage;