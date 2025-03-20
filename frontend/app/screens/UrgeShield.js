import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ScrollView 
} from 'react-native';

const UrgeShieldScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>URGE SHIELD</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Strong Craving Section */}
        <View style={styles.cravingSection}>
          <Image 
            source={require('../assets/img01.png')} 
            style={styles.cravingImage} 
            resizeMode="contain"
          />
          <View style={styles.cravingTextContainer}>
            <Text style={styles.cravingTitle}>Strong Craving?</Text>
            <Text style={styles.cravingSubtitle}>You are Not Alone!</Text>
            <Text style={styles.cravingSubtitle}>We are Here For You!</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>ReWire Assistant</Text>
                <Text style={styles.buttonSubtitle}>Chat. Express. Overcome.</Text>
                <Text style={styles.buttonSubtitle}>Your Digital Friend is here for you!</Text>
              </View>
              <Image 
                source={require('../assets/img02.png')} 
                style={styles.buttonIcon} 
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>Motivational Content</Text>
                <Text style={styles.buttonSubtitle}>Access 100+ motivational content.</Text>
                <Text style={styles.buttonSubtitle}>Stay on track and stay motivated!</Text>
              </View>
              <Image 
                source={require('../assets/img03.png')} 
                style={styles.buttonIcon} 
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>LifeLine Support</Text>
                <Text style={styles.buttonSubtitle}>Feeling Suicidal? You matter.</Text>
                <Text style={styles.buttonSubtitle}>Connect with someone who cares.</Text>
              </View>
              <Image 
                source={require('../assets/img04.png')}
                style={styles.buttonIcon} 
                resizeMode="contain"
              />
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
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#8DC5C5',
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  cravingSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cravingImage: {
    width: 220, 
    height: 220,
    marginRight: 20, 
  },
  cravingTextContainer: {
    flexShrink: 1, 
    alignItems: 'flex-start',
  },
  cravingTitle: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#2B7A78',
  },
  cravingSubtitle: {
    fontSize: 18, 
    color: '#5C5C5C',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 30, 
    paddingHorizontal: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#5C5C5C',
  },
  buttonIcon: {
    width: 80,
    height: 80,
  },
});

export default UrgeShieldScreen;
