import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = ()=>{
        navigation.navigate('Login');
        setItem('onboarded', '1');
    }


  return (
    <View className="flex-1 bg-white">
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            bottomBarHighlight={false}
           
            
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image: (
                        <View className="w-96 h-96">
                            <Lottie source={require('../assets/onboarding-animation/animation_lmnmo3np.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Boost Productivity',
                    subtitle: 'With our device, you can boost your productivity level.',
                },
                {
                    backgroundColor: '#fef3c7',
                    image: (
                        <View className="w-96 h-96">
                            <Lottie source={require('../assets/onboarding-animation/animation_lmnmevbj.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Track your Progress',
                    subtitle: 'Get your result seamlessly without interruption and track your progress.',
                },
                {
                    backgroundColor: '#fed4c7',
                    image: (
                        <View className="w-96 h-96">
                            <Lottie source={require('../assets/onboarding-animation/animation_lmoyno0z.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'With the help of AI',
                    subtitle: 'Get your result with a suggestion of an Artificiall Intelligence.',
                },

            ]}
        />
    </View>
  )
}

