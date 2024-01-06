import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import DetailsScreen from '../screens/DetailsScreen';
import ResultScreen from '../screens/ResultScreen';
import { getItem } from '../utils/asyncStorage.js';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(()=>{
    checkIfAlreadyOnboarded();
  },[])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    setShowOnboarding(onboarded !== '1');
  };

  if (showOnboarding === null) {
    return null;
  }



return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={showOnboarding ? 'Onboarding' : 'Login'}>
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
      <Stack.Screen name="BottomNavBar" options={{ headerShown: false }} component={BottomNavBar} />
      <Stack.Screen name="Details" options={{ headerShown: false }} component={DetailsScreen} />
      <Stack.Screen name="Results" options={{ headerShown: true, title: 'Previous Result' }} component={ResultScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
}
