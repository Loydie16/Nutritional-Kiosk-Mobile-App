import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { textS } from "../utils/sizes";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

function ResultScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View className="flex-1 dark:bg-[#001515] ">
      <FlatList
        data={item}
        numColumns={1}
        // keyExtractor={(item) => item.id.toString()} // Ensure id is converted to string
        showsVerticalScrollIndicator={false}
        className=""
        renderItem={({ item }) => {
          // Check if all values in the item object are 0 or "0"
          const isNoResults = Object.values(item).every(
            (value) => value === 0 || value === "0"
          );

          return (
            <View className="flex-1 bg-slate-200 border-2 border-slate-400 m-3 rounded-3xl dark:bg-[#151c22] dark:border-2 dark:border-slate-400  ">
              {isNoResults ? (
                <View className="items-center justify-center p-10">
                  <Text className="dark:text-white" >No Previous Result</Text>
                </View>
              ) : (
                <>
                  <View className="flex-row justify-between p-4  ">
                    <Text
                      className="dark:text-white"
                      style={{ fontSize: textS(10) }}
                    >
                      Height: {item.height} CM
                    </Text>
                    <Text
                      className="dark:text-white"
                      style={{ fontSize: textS(10) }}
                    >
                      Weight: {item.weight} KG
                    </Text>
                  </View>

                  <View className=" flex-1  justify-center items-center p-4">
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

                  <View className="justify-center items-center">
                    <TouchableOpacity
                      className=" "
                      onPress={() =>
                        navigation.navigate("Details", { item: item })
                      }
                    >
                      <Text
                        className="pb-2 italic dark:text-white"
                        style={{ fontSize: textS(8) }}
                      >
                        Click this to View Recommendation
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

export default ResultScreen;
