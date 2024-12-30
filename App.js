import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import Splash from './app/screens/Splash';

export default function App() {
  return (
    <SafeAreaView>
      {/* 
      SafeAreaView make sure that the content is not covered by the notch
      StatusBar's style set to auto, makes the status bar transparent
      */}
      <StatusBar style="auto" />
      <Splash />
      {/* 
      
      Add components here. Comment and add your components.
      After the login logic is implemented, all startup components will be logically combined here 
      
      */}
    </SafeAreaView>
  );
}