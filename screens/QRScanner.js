import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

export default function QRScanner() {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} className="dark:bg-black">
      <Lottie source={require('../assets/animations/UnderConstruction.json')} autoPlay loop />
    </View>
  )
}