import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';

import useQuotes from '../../hooks/quote-service';
import { useNavigation, useTheme } from '@react-navigation/native';
import Avatar from '../../fragments/avatar';
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
  const [userName] = useState('Shark');

  const getGreeting = () => {
    let greeting;
    const hour = new Date().getHours();
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    return greeting;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate y data refresh
    setTimeout(() => {
      setRefreshing(false);
      // Trigger success haptic
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.containerWrap}>
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
        contentContainerStyle={styles.container}
      >
        {/* Greeting Section */}
        <View style={styles.header}>
          <H1>{getGreeting()}</H1>
          <Avatar
            name={userName}
            radius={30}
            backgroundColor='#74007a'
            color='#fff'
            opacity={0.9}
            onPress={() => navigation.navigate('SettingsNavigator', { screen: 'Settings' })}
          />
        </View>

        {/* Quote Section */}
        {quote && (
          <Card style={[styles.quoteCard, { backgroundColor: colors.card }]}>
            <Card.Content>
              <Text style={[styles.quoteCardQuote, { color: colors.text }]}>
                {quote.quote}
              </Text>
              <Text style={[styles.quoteCardAuthor, { color: colors.text }]}>
                - {quote.author} -
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionCardContainer} accessibilityRole="menubar">

          <Card style={styles.quickActionCard} onPress={() => { console.log('Implement to emergency page') }}>
            <Card.Content style={styles.quickActionCardContent}>
              <Icon type='ionicon' name='medical' color={colors.primary} />
              <Text style={{ color: colors.text }}>Emergency</Text>
            </Card.Content>
          </Card>

          <Card style={styles.quickActionCard} onPress={() => { console.log('Implement to emergency page') }}>
            <Card.Content style={styles.quickActionCardContent}>
              <Icon type='ionicon' name='clipboard' color={colors.primary} />
              <Text style={{ color: colors.text }}>Your Report</Text>
            </Card.Content>
          </Card>

        </View>

        <H2>Your Progress</H2>

        {/* <ScrollView horizontal={true} contentContainerStyle={styles.progressCardsContainer} accessibilityLabel="Progress tracking cards"> */}
        <View style={styles.progressCardsContainer}>
          <ProgressCard title="Overall Progress" currentProgress={48} maximumProgress={100} />
          <ProgressCard title="Daily Tasks" currentProgress={65} maximumProgress={100} />
        </View>
        {/* </ScrollView> */}

        <H2>Achievements</H2>

        <ScrollView horizontal={true} contentContainerStyle={styles.achievementsContainer} accessibilityLabel="Your achievements">

          <AchievementCard
            title={"Task 07"}
            status={"Completed"}
            icon={<Icon type="materialcommunityicons" name="check-circle-outline" size={24} color="#FFD700" />}
          />

          <AchievementCard
            title={"7 Days"}
            status={"Streak"}
            icon={<Icon type="materialcommunityicons" name="trophy-outline" size={24} color="#C0C0C0" />}
          />

        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 16
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  quoteCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 16,
    minHeight: 150
  },
  quoteCardQuote: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
  },
  quoteCardAuthor: {
    textAlign: "center",
    marginTop: 8,
  },
  quickActionCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 8,
  },
  quickActionCard: {
    padding: 16,
    width: '50%'
  },
  quickActionCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  progressCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8
  },
  achievementsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  }
});