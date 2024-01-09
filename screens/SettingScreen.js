import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

export default function SettingScreen() {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Lottie source={require('../assets/animations/UnderConstruction.json')} autoPlay loop />
    </View>
  )
}