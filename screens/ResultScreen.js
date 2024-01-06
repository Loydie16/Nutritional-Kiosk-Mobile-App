import { View, Text, FlatList, Dimensions, TouchableOpacity, PixelRatio } from 'react-native';
import React from 'react';
import { textS, widthRatio, heightRatio, moderateScale } from '../utils/sizes';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function ResultScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation(); // Initialize navigation


  return (
    <View className="flex-1 ">
      <FlatList
        data={item}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()} // Ensure id is converted to string
        showsVerticalScrollIndicator={false}
        className=""
        renderItem={({ item }) => {
          return (
            <View className="flex-1 bg-slate-200 m-3 rounded-3xl  ">
              <View className="flex-row justify-between p-4  ">
                <Text className="" style={{ fontSize: textS(10) }}>
                  Height: {item.height} CM
                </Text>
                <Text className="" style={{ fontSize: textS(10) }}>
                  Weight: {item.weight} KG
                </Text>
              </View>

              <View className=" flex-1  justify-center items-center p-4">
                <Text className="font-bold " style={{ fontSize: textS(20) }}>
                  BMI: {item.bmi}
                </Text>
                <Text className="font-bold " style={{ fontSize: textS(14) }}>
                  Classification: {item.classification}
                </Text>
              </View>

              <View className=" flex-row justify-between  ">
                <Text className="px-4 pb-2 pt-3" style={{ fontSize: textS(10) }}>
                  Date: {item.date}
                </Text>
                <Text className="px-4 pb-2 pt-3" style={{ fontSize: textS(10) }}>
                  Time: {item.time}
                </Text>
              </View>

              <View className="justify-center items-center">
                <TouchableOpacity className=" " onPress={() => navigation.navigate('Details', { item: item })}>
                  <Text className="pb-2 italic" style={{ fontSize: textS(8) }}>
                    Click this to View Recommendation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}


export default ResultScreen;