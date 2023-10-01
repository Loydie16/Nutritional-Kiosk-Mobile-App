import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function HomeScreen() {
  const navigation = useNavigation(); // Initialize navigation

  const recentRecord = {
    height: '178',
    weight: '60',
    date: 'September 25, 2023',
    time: '12:45:55',
    bmi: '20',
    classification: 'Normal',
  };

  const items = [
    {
      id: 1,
      height: '170',
      weight: '60',
      date: '11/24/23',
      time: '11:55:43',
      bmi: '20',
      classification: 'Normal',
    },
    {
      id: 2,
      height: '165',
      weight: '70',
      date: '11/25/23',
      time: '09:30:21',
      bmi: '25.7',
      classification: 'Overweight',
    },
    {
      id: 3,
      height: '180',
      weight: '80',
      date: '11/26/23',
      time: '14:15:10',
      bmi: '24.7',
      classification: 'Normal',
    },
    {
      id: 4,
      height: '160',
      weight: '55',
      date: '11/27/23',
      time: '16:45:55',
      bmi: '21.5',
      classification: 'Normal',
    },
    {
      id: 5,
      height: '175',
      weight: '90',
      date: '11/28/23',
      time: '08:20:37',
      bmi: '29.4',
      classification: 'Obese',
    },
    {
      id: 6,
      height: '155',
      weight: '50',
      date: '11/29/23',
      time: '10:10:15',
      bmi: '20.9',
      classification: 'Normal',
    },
    {
      id: 7,
      height: '168',
      weight: '75',
      date: '11/30/23',
      time: '12:40:28',
      bmi: '26.6',
      classification: 'Overweight',
    },
    {
      id: 8,
      height: '162',
      weight: '68',
      date: '12/01/23',
      time: '07:55:43',
      bmi: '26.0',
      classification: 'Overweight',
    },
    {
      id: 9,
      height: '178',
      weight: '88',
      date: '12/02/23',
      time: '13:20:17',
      bmi: '27.8',
      classification: 'Overweight',
    },
    {
      id: 10,
      height: '163',
      weight: '57',
      date: '12/03/23',
      time: '15:30:02',
      bmi: '21.4',
      classification: 'Normal',
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />

      <View className="flex-row justify-between items-center p-4">
        <Text className="font-bold text-3xl">Hello, Username!</Text>
        <Image source={require('../assets/images/HelloHand.png')} className="w-28 h-28" />
      </View>

      <View className="flex-1 p-4 bg-slate-200 rounded-t-3xl">
        <Text className="font-bold text-xl">Your recent record:</Text>
        <TouchableOpacity
          className='bg-purple-200 p-4 rounded-lg mt-4'
          onPress={() => navigation.navigate('Details', { item: recentRecord })} // Pass recentRecord data to DetailsScreen
        >
          <View className="flex-col justify-between items-start gap-1 ">
            <Text>Height: {recentRecord.height} CM </Text>
            <Text>Weight: {recentRecord.weight} KG </Text>
          </View>
          <View className="justify-center items-center p-4">
            <Text className="font-bold text-2xl">BMI: {recentRecord.bmi} </Text>
            <Text className="font-bold text-2xl">Classification: {recentRecord.classification} </Text>
          </View>
          <View className="flex-row justify-between items-center ">
            <Text>Date: {recentRecord.date} </Text>
            <Text>Time: {recentRecord.time} </Text>
          </View>
          <View className="justify-center items-center">
            <Text className="pt-4 italic">Click to View Recommendation</Text>
          </View>
        </TouchableOpacity>

        <Text className="font-bold text-xl pt-4">Your previous records:</Text>

        <View className="flex-1 mt-3">
          <FlatList 
              data={items}
              numColumns={1}
              keyExtractor={item=> item.id}
              showsVerticalScrollIndicator={false}
              
              className="mx-1"
              renderItem={({item})=>{
                  return (
                    <TouchableOpacity className='bg-purple-200 p-4 rounded-lg mt-4' onPress={() => navigation.navigate('Details', { item })}>
                      <View className="flex-col justify-between items-start gap-1 ">
                        <Text>Height: {item.height} CM</Text>
                        <Text>Weight: {item.weight} KG </Text> 
                      </View>
                      <View className="justify-center items-center p-4">
                        <Text className="font-bold text-2xl">BMI: {item.bmi} </Text>
                        <Text className="font-bold text-2xl">Classification: {item.classification} </Text>
                      </View>
                      <View className="flex-row justify-between items-center ">
                        <Text>Date: {item.date} </Text>
                        <Text>Time: {item.time} </Text> 
                      </View>
                      <View className="justify-center items-center">
                        <Text className="pt-4 italic">Click to View Recommendation</Text>
                      </View>
                  </TouchableOpacity>
                      
                  )
              }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
