import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
// import * as Haptics from 'expo-haptics';
import useQuotes from '../../hooks/quote-service';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import Card from '../../fragments/card';
import { H1, H2 } from '../../fragments/heading';
import ProgressCard from '../../fragments/progress-card';
import AchievementCard from '../../fragments/achievement-card';
import { Icon } from '../../fragments/icon';

export default function Home() {

  const { quote } = useQuotes();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [userName] = useState('shark');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate y data refresh
    setTimeout(() => {
      setRefreshing(false);
      // Trigger success haptic
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  }, []);

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
        <View style={styles.header}>
          <H1>{getGreeting()}</H1>
          <Avatar
            rounded
            title={userName.split("")[0].toUpperCase()}
            activeOpacity={0.7}
            containerStyle={{
              backgroundColor: colors.card,
              height: 56,
              width: 56,
            }}
            titleStyle={{
              color: colors.text
            }}
            onPress={() => navigation.navigate('SettingsNavigator', { screen: 'Settings' })}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionCardContainer} accessibilityRole="menubar">

          <Card style={styles.quickActionCard} onPress={() => { console.log('Redirect to emergency page') }}>
            <Card.Content style={styles.quickActionCardContent}>
              <Icon type='ionicon' name='medical' color={colors.primary} />
              <Text>Emergency</Text>
            </Card.Content>
          </Card>

          <Card style={styles.quickActionCard}>
            <Card.Content style={styles.quickActionCardContent}>
              <Icon type='materialcommunityicons' name='robot-happy' color={colors.primary} />
              <Text>Chat Now</Text>
            </Card.Content>
          </Card>

          <Card style={styles.quickActionCard}>
            <Card.Content style={styles.quickActionCardContent}>
              <Icon type='ionicon' name='calendar' color={colors.primary} />
              <Text>Schedule</Text>
            </Card.Content>
          </Card>

        </View>

        {quote && (
          <Card style={{ marginVertical: 8, padding: 8, backgroundColor: `rgba(255, 255, 255, 0.7)` }}>
            <Card.Content>
              <Text style={{ fontSize: 18, fontStyle: "italic", textAlign: "center", color: colors.text }}>
                {quote.quote}
              </Text>
              <Text style={{ textAlign: "center", marginTop: 8, color: colors.text }}>
                - {quote.author} -
              </Text>
            </Card.Content>
          </Card>
        )}

        <H2>Your Progress</H2>

        <View style={styles.progressCardsContainer} accessibilityRole="group" accessibilityLabel="Progress tracking cards">
          <ProgressCard title="Overall Progress" currentProgress={48} maximumProgress={100} />
          <ProgressCard title="Daily Tasks" currentProgress={65} maximumProgress={100} />
        </View>

        <H2>Achievements</H2>

        <View style={styles.achievementsContainer} accessibilityRole="group" accessibilityLabel="Your achievements">

          <AchievementCard
            title={"Task 07"}
            status={"Completed"}
            icon={<Icon type="ionicon" name="help-outline" size={24} color="black" />}
          />

          <AchievementCard
            title={"7 Days"}
            status={"Streak"}
            icon={<Icon type="ionicon" name="help-outline" size={24} color="black" />}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  quickActionCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  quickActionCard: {
    padding: 16
  },
  quickActionCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  progressCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8
  },
  achievementsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8
  }
});