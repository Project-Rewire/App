import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  RefreshControl,
  Animated,
  Platform
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [progressAnim] = useState(new Animated.Value(0));
  const [userName] = useState('John'); // Replace with actual user name from context/redux

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      // Trigger success haptic
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  }, []);

  const handleButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Animate progress on mount
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0.48, // 48% progress
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressRotation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            accessibilityLabel="Pull down to refresh content"
            accessibilityHint="Updates your progress and achievements"
          />
        }
        accessibilityLabel="Home page content"
      >
        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting} accessibilityRole="header">
            {getGreeting()}, {userName}
          </Text>
          <Text style={styles.date} accessibilityLabel={`Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions} accessibilityRole="menubar">
          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={handleButtonPress}
            accessibilityLabel="Emergency help"
            accessibilityHint="Access immediate emergency support"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="medical" size={24} color="#4A90E2" />
            <Text style={styles.quickActionText}>Emergency</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={handleButtonPress}
            accessibilityLabel="Chat now"
            accessibilityHint="Start a conversation with a support specialist"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chatbubble-ellipses" size={24} color="#4A90E2" />
            <Text style={styles.quickActionText}>Chat Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={handleButtonPress}
            accessibilityLabel="Schedule"
            accessibilityHint="View or schedule your appointments"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="calendar" size={24} color="#4A90E2" />
            <Text style={styles.quickActionText}>Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Quote Section - Enlarged */}
        <View 
          style={styles.quoteContainer}
          accessibilityLabel="Motivational quote"
          accessibilityRole="text"
        >
          <Text style={styles.quoteText}>
            "Your decision to kill your addiction will become a reality only if you
            believe and reinforce the fact that you have the capacity to do it."
          </Text>
          <Text style={styles.quoteAuthor}>Osho Maharaj</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.sectionLabel}>
          <Text 
            style={styles.sectionLabelText} 
            accessibilityRole="header"
          >
            Your Progress
          </Text>
        </View>

        {/* Progress Cards */}
        <View style={styles.progressCardsContainer} accessibilityRole="group" accessibilityLabel="Progress tracking cards">
          {/* Overall Progress Card */}
          <View 
            style={styles.progressCard}
            accessibilityLabel="Overall Progress Card"
          >
            <View style={styles.progressCircleContainer}>
              <View 
                style={styles.progressCircle}
                accessibilityLabel="Progress circle showing 48 percent completion"
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: 100, now: 48 }}
              >
                <View style={styles.progressArc} />
                <View style={styles.progressInnerCircle}>
                  <Ionicons name="person" size={16} color="#4A90E2" />
                  <Text style={styles.progressPercentage}>48%</Text>
                  <Text style={styles.progressStatus}>Good</Text>
                </View>
              </View>
            </View>
            <Text style={styles.progressTitle}>Overall Progress</Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              accessibilityLabel="View progress details"
              accessibilityHint="Shows detailed information about your overall progress"
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>

          {/* Daily Task Card */}
          <View 
            style={styles.progressCard}
            accessibilityLabel="Daily Task Progress Card"
          >
            <View style={styles.progressCircleContainer}>
              <View 
                style={styles.progressCircle}
                accessibilityLabel="Daily task progress showing 65 percent completion"
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: 100, now: 65 }}
              >
                <View style={styles.dailyProgressArc} />
                <View style={styles.progressInnerCircle}>
                  <Ionicons name="person" size={16} color="#4A90E2" />
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
          <Text 
            style={styles.sectionLabelText}
            accessibilityRole="header"
          >
            Achievements
          </Text>
        </View>

        {/* Achievement Cards */}
        <View 
          style={styles.achievementsContainer} 
          accessibilityRole="group" 
          accessibilityLabel="Your achievements"
        >
          {/* Task Completed Card */}
          <View 
            style={styles.achievementCard}
            accessibilityLabel="Task 7 completed achievement, gold medal"
          >
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
          <View 
            style={styles.achievementCard}
            accessibilityLabel="7 day streak achievement, silver medal"
          >
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
          <View 
            style={[styles.achievementCard, styles.partialCard]}
            accessibilityLabel="More achievements available"
          />
        </View>

        {/* Bottom Menu */}
        <View style={styles.bottomMenu} accessibilityRole="menubar">
          <TouchableOpacity 
            style={styles.menuItem}
            accessibilityLabel="Your Report"
            accessibilityHint="View your progress reports and statistics"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.reportButton}>
              <FontAwesome5 name="clipboard-list" size={20} color="#666" />
              <Text style={styles.menuItemText}>Your Report</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            accessibilityLabel="ReWire Assistant"
            accessibilityHint="Get help from your virtual assistant"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.assistantButton}>
              <FontAwesome5 name="robot" size={20} color="#4A90E2" />
              <Text style={styles.menuItemText}>ReWire Assistant</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 16,
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16, // Increased from 12 to 16 for larger touch target
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '30%',
    minHeight: 88, // Ensure minimum height for touch target
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14, // Increased from 12 to 14 for better readability
    color: '#333',
    fontWeight: '500',
  },
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
    color: '#333', // Ensure good contrast
  },
  quoteAuthor: {
    fontSize: 15, 
    color: '#666', // Darkened from #888 for better contrast
    textAlign: 'right',
  },
  sectionLabel: {
    paddingHorizontal: 16,
    marginTop: 20, 
    marginBottom: 12,
  },
  sectionLabelText: {
    fontSize: 18, // Increased from 17 for better visibility 
    color: '#555', // Darkened from #666 for better contrast 
    fontWeight: '600', // Increased from 500 for better emphasis
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
    minHeight: 180, // Ensure minimum height for touch target
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  progressStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  progressTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  detailsButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8, // Increased from 6 to 8 for larger touch target
    borderRadius: 15,
    marginTop: 12,
    minWidth: 90, // Ensure minimum width for touch target
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  achievementsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  achievementCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 140, // Ensure minimum height
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
  },
  goldIcon: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  silverIcon: {
    backgroundColor: 'rgba(192, 192, 192, 0.1)',
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  achievementSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  achievementBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
  },
  achievementBadgeText: {
    fontSize: 12,
    color: '#666',
  },
  partialCard: {
    opacity: 0.5,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 16,
  },
  menuItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16, // Increased from 12 to 16 for larger touch target
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 55, // Ensure minimum height
  },
  assistantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16, // Increased from 12 to 16 for larger touch target
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 55, // Ensure minimum height
  },
  menuItemText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default HomePage;