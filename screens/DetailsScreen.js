import React from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { textS } from "../utils/sizes";

function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <View className="flex-1 dark:bg-[#001515]">
      <View className=" bg-slate-200 border-2 border-slate-400 m-3 rounded-3xl h-1/3 dark:bg-[#151c22] dark:border-2 dark:border-slate-400 ">
        <View className="flex-row justify-between p-4  ">
          <Text className="dark:text-white" style={{ fontSize: textS(10) }}>
            Height: {item.height} CM
          </Text>
          <Text className="dark:text-white" style={{ fontSize: textS(10) }}>
            Weight: {item.weight} KG
          </Text>
        </View>

        <View className=" flex-1  justify-center items-center p-4 ">
          <Text
            className="font-bold dark:text-white"
            style={{ fontSize: textS(20) }}
          >
            BMI: {item.bmi}
          </Text>
          <Text
            className="font-bold dark:text-white"
            style={{ fontSize: textS(14) }}
          >
            Classification: {item.classification}
          </Text>
        </View>

        <View className=" flex-row justify-between  ">
          <Text
            className="px-4 pb-2 pt-3 dark:text-white"
            style={{ fontSize: textS(10) }}
          >
            Date: {item.date}
          </Text>
          <Text
            className="px-4 pb-2 pt-3 dark:text-white"
            style={{ fontSize: textS(10) }}
          >
            Time: {item.time}
          </Text>
        </View>
      </View>

      <View className="flex-1 bg-slate-300 border-2 border-slate-400 rounded-3xl mx-3 mb-3 dark:bg-[#151c22] dark:border-2 dark:border-slate-400">
        <ScrollView className=" flex-1  " showsVerticalScrollIndicator={false} >
          <Text
            className="text-justify tracking-wide leading-5 mx-5 my-4 dark:text-white"
            style={{ fontSize: textS(10) }}
          >
            {item.recommendation}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default DetailsScreen;
