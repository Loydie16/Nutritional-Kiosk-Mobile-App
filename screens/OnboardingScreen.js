import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
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
    <View style={styles.container}>
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            bottomBarHighlight={false}
           
            
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../assets/onboarding-animation/animation_lmnmo3np.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Boost Productivity',
                    subtitle: 'Subscribe this channel to boost your productivity level',
                },
                {
                    backgroundColor: '#fef3c7',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../assets/onboarding-animation/animation_lmnmevbj.json')} autoPlay loop />
                        </View>
                    ),
                    title: 'Work Seamlessly',
                    subtitle: 'Get your work done seamlessly without interruption',
                },

            ]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width
    },
    
})