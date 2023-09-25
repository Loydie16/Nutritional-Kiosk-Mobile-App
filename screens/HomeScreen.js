import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'



export default function HomeScreen() {
    

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        backgroundColor="transparent"
        translucent={true} />

        <View className="flex-row justify-between items-center p-4">
          <Text className="font-bold text-3xl">Hello, Username!</Text>
          <Image source={require('../assets/images/HelloHand.png')} className="w-28 h-28"/>
        </View>

        <View className="flex-1 p-4">
          <Text className="font-bold text-xl">Your recent record:</Text>
          <TouchableOpacity className='bg-purple-200 p-4 rounded-lg mt-4'>
            <View>
              <Text>Height: </Text>
              <Text>Height: </Text>
              <Text>Height: </Text>
            </View>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

