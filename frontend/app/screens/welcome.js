import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const RewireApp = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={goToNextStep} />;
      case 2:
        return <Step2 onNext={goToNextStep} />;
      case 3:
        return <Step3 onNext={goToNextStep} />;
     
      default:
        return <Step1 onNext={goToNextStep} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>Rewire</Text>
          {currentStep < 4 && (
            <View style={styles.stepIndicator}>
              <Text style={styles.stepText}>Step {currentStep} of 3</Text>
              <View style={styles.stepDots}>
                <View style={[styles.dot, currentStep === 1 && styles.activeDot]} />
                <View style={[styles.dot, currentStep === 2 && styles.activeDot]} />
                <View style={[styles.dot, currentStep === 3 && styles.activeDot]} />
              </View>
            </View>
          )}
        </View>
        {renderStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

const Step1 = ({ onNext }) => {
  return (
    <View style={styles.minimalisticStepContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/rewire-icon.png')} // Update with your actual logo filename
          style={styles.logoImage}
        />
       
      </View>
    < View ></View>
      <Text style={styles.appName}>ReWire</Text>
      <Text style={styles.tagline}>Heal the mind, Heal the life</Text>
      
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>Breaking free from addiction starts today</Text>
        
        <View style={styles.minimalisticBulletPoints}>
          <Text style={styles.minimalisticBulletText}>
            No judgments. No pressure. Just a step-by-step journey designed for you.
          </Text>
          <Text style={styles.minimalisticBulletText}>
            Let's create a personalized recovery plan that fits into your daily life.
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.minimalisticButton} onPress={onNext}>
        <Text style={styles.minimalisticButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step2 = ({ onNext }) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>How We'll Help You</Text>
      <Text style={styles.quote}>"You're not alone. Here's how Rewire supports you, every step of the way:"</Text>
      
      <View style={styles.featureCards}>
        <FeatureCard 
          icon="clipboard-check" 
          title="A Personalized Recovery Plan" 
          description="Small, achievable steps from Day 1."
        />
        <FeatureCard 
          icon="users" 
          title="A Community That Understands" 
          description="Anonymous support from people on the same journey."
        />
        <FeatureCard 
          icon="user-md" 
          title="Real Experts, Real Help" 
          description="Book sessions with trained counselors and therapists."
        />
        <FeatureCard 
          icon="shield-alt" 
          title="Stay Strong with Urge Shield" 
          description="AI-driven motivation, instant help, and emergency support."
        />
        <FeatureCard 
          icon="chart-line" 
          title="Track Progress & Celebrate Wins" 
          description="See how far you've come and stay motivated."
        />
      </View>
      
      <Text style={styles.insightText}>
        <MaterialIcons name="lightbulb" size={16} color="#40c4ff" />
        {" The hardest part is starting. We'll make the rest easier."}
      </Text>
      
      <TouchableOpacity style={styles.minimalisticButton} onPress={onNext}>
        <Text style={styles.minimalisticButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step3 = ({ onNext }) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Why Rewire?</Text>
      <Text style={styles.quote}>"Most people fail to quit because they do it alone. But with Rewire, you'll always have:"</Text>
      
      <View style={styles.whyRewireContainer}>
        <WhyRewireItem 
          icon="timer-24" 
          color="#40c4ff"
          title="24/7 AI Assistance" 
          description="Need motivation or a distraction? We're here."
        />
        <WhyRewireItem 
          icon="check-circle" 
          color="#26a69a"
          title="Daily Check-ins" 
          description="Simple tasks to keep you focused and consistent."
        />
        <WhyRewireItem 
          icon="lock" 
          color="#40c4ff"
          title="Safety & Privacy" 
          description="No one knows who you are unless you choose to share."
        />
        <WhyRewireItem 
          icon="lifebuoy" 
          color="#26a69a"
          title="Emergency Lifeline Support" 
          description="Access national helplines when you need immediate help."
        />
      </View>
      
      <Text style={styles.insightText}>
        <MaterialIcons name="rocket" size={16} color="#40c4ff" />
        {" Your journey to recovery starts now."}
      </Text>
      
      <TouchableOpacity style={styles.minimalisticButton} onPress={onNext}>
        <Text style={styles.minimalisticButtonText}>Let's Begin!</Text>
      </TouchableOpacity>
    </View>
  );
};



const FeatureCard = ({ icon, title, description }) => {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIconContainer}>
        <FontAwesome name={icon} size={24} color="#40c4ff" />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
};

const WhyRewireItem = ({ icon, color, title, description }) => {
  return (
    <View style={styles.whyRewireItem}>
      <View style={[styles.whyRewireIcon, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.whyRewireContent}>
        <Text style={styles.whyRewireTitle}>{title}</Text>
        <Text style={styles.whyRewireDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40c4ff',
  },
  stepIndicator: {
    alignItems: 'flex-end',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  stepDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#40c4ff',
  },
  minimalisticStepContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center', // Center align all step containers
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  leafOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  leaf: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
  },
  leafTopLeft: {
    top: 0,
    left: 0,
    transform: [{ rotate: '-45deg' }],
  },
  leafTopRight: {
    top: 0,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  leafBottomLeft: {
    bottom: 0,
    left: 0,
    transform: [{ rotate: '-135deg' }],
  },
  leafBottomRight: {
    bottom: 0,
    right: 0,
    transform: [{ rotate: '135deg' }],
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#40c4ff',
    marginBottom: 4,
    textAlign: 'center', // Ensure centered text
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
    textAlign: 'center', // Ensure centered text
  },
  welcomeContent: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  minimalisticBulletPoints: {
    width: '100%',
  },
  minimalisticBulletText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  minimalisticButton: {
    backgroundColor: '#40c4ff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  minimalisticButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center', // Center align titles
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
    textAlign: 'center', // Center align quotes
    width: '90%', // Give some margin on the sides
  },
  featureCards: {
    marginBottom: 24,
    width: '100%', // Full width for cards
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  insightText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    width: '90%', // Give some margin on the sides
  },
  whyRewireContainer: {
    marginBottom: 24,
    width: '100%', // Full width for items
  },
  whyRewireItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  whyRewireIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  whyRewireContent: {
    flex: 1,
  },
  whyRewireTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  whyRewireDescription: {
    fontSize: 14,
    color: '#666',
  },
  dashboardContainer: {
    flex: 1,
    padding: 16,
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dashboardLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  dashboardAppName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#40c4ff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40c4ff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  todayActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center', // Center align section titles
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIconContainer: {
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  urgeShieldContainer: {
    marginBottom: 36,
    alignItems: 'center',
  },
  urgeShieldButton: {
    backgroundColor: '#26a69a',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginVertical: 12,
  },
  urgeShieldText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  urgeShieldDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeNavText: {
    color: '#40c4ff',
    fontWeight: 'bold',
  },
});

export default RewireApp;