import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
    

  return (
    <View className="flex-1 bg-white justify-center items-center">
        <Text className="font-extrabold text-7xl">Home Screen</Text>
    </View>
  )
}

