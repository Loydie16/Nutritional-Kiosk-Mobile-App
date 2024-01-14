import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
  PixelRatio,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { LineChart } from "react-native-chart-kit";
import { textS, widthRatio, heightRatio, moderateScale } from "../utils/sizes";
import { useColorScheme } from "../theme/colorScheme";

export default function HomeScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const { colorScheme } = useColorScheme();

  const recentRecord = {
    height: "178",
    weight: "60",
    date: "11/25/23",
    time: "12:45:55",
    bmi: "20",
    classification: "Normal",
  };

  const items = [
    {
      id: 1,
      height: "170",
      weight: "60",
      date: "11/24/23",
      time: "11:55:43",
      bmi: "20",
      classification: "Normal",
    },
    {
      id: 2,
      height: "165",
      weight: "70",
      date: "11/25/23",
      time: "09:30:21",
      bmi: "25.7",
      classification: "Overweight",
    },
    {
      id: 3,
      height: "180",
      weight: "80",
      date: "11/26/23",
      time: "14:15:10",
      bmi: "24.7",
      classification: "Normal",
    },
    {
      id: 4,
      height: "160",
      weight: "55",
      date: "11/27/23",
      time: "16:45:55",
      bmi: "21.5",
      classification: "Normal",
    },
    {
      id: 5,
      height: "175",
      weight: "90",
      date: "11/28/23",
      time: "08:20:37",
      bmi: "29.4",
      classification: "Obese",
    },
    {
      id: 6,
      height: "155",
      weight: "50",
      date: "11/29/23",
      time: "10:10:15",
      bmi: "20.9",
      classification: "Normal",
    },
    {
      id: 7,
      height: "168",
      weight: "75",
      date: "11/30/23",
      time: "12:40:28",
      bmi: "26.6",
      classification: "Overweight",
    },
    {
      id: 8,
      height: "162",
      weight: "68",
      date: "12/01/23",
      time: "07:55:43",
      bmi: "26.0",
      classification: "Overweight",
    },
    {
      id: 9,
      height: "178",
      weight: "88",
      date: "12/02/23",
      time: "13:20:17",
      bmi: "27.8",
      classification: "Overweight",
    },
    {
      id: 10,
      height: "163",
      weight: "57",
      date: "12/03/23",
      time: "15:30:02",
      bmi: "21.4",
      classification: "Normal",
    },
  ];

  const labels = items.map((item) => item.date);
  const values = items.map((item) => parseFloat(item.bmi));

  // Set the threshold for enabling scrolling
  const scrollableThreshold = 15;
  const isScrollable = items.length > scrollableThreshold;

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View className="flex-1 bg-neutral-200 dark:bg-[#000000]  ">
        <View className="h-1/5 bg-neutral-100  dark:bg-[#232323] dark:border-slate-400 rounded-b-3xl">
          <SafeAreaView className="flex-1 p-4  ">
            <View className="flex-row items-center w-full">
              <View className="w-5/6    ">
                <Text
                  className="font-bold pl-2 dark:text-white"
                  style={{ fontSize: textS(15) }}
                >
                  Hello,{" "}
                </Text>
                <Text
                  className="font-bold pl-2 dark:text-white"
                  style={{ fontSize: textS(20) }}
                >
                  Username!
                </Text>
              </View>
              <View className="items-end   self-center">
                <Image
                  source={require("../assets/images/Profile-icon.png")}
                  style={{
                    tintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View
          className="flex-1justify-self-center bg-neutral-100 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 mt-3  rounded-3xl self-center "
          style={{ width: widthRatio(350) }}
        >
          <Text
            className=" font-bold  pl-4 pt-2 dark:text-white"
            style={{ fontSize: textS(12) }}
          >
            Line chart of all BMI records
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="self-center"
          >
            <LineChart
              data={{
                labels,
                datasets: [
                  {
                    data: values,
                    strokeWidth: 2,
                  },
                ],
              }}
              width={isScrollable ? 3000 : Dimensions.get("window").width - 25}
              height={heightRatio(200)}
              bezier
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom:
                  colorScheme === "dark" ? "#29323c" : "#eff3ff",
                backgroundGradientTo:
                  colorScheme === "dark" ? "#485563" : "#efefef",
                decimalPlaces: 2,
                color: (opacity = 1) =>
                  colorScheme === "dark"
                    ? `#ffffff`
                    : `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForVerticalLabels: {
                  rotation: 30,
                  fontSize: 10,
                },
                yLabelsOffset: -10,
                xLabelsOffset: -10,
              }}
              style={{
                marginVertical: heightRatio(8),
                paddingHorizontal: 10,
                borderRadius: moderateScale(16),
                
              }}
            />
          </ScrollView>
        </View>

        <View
          className="flex-1 bg-neutral-100 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 self-center my-3 rounded-3xl "
          style={{ width: widthRatio(350) }}
        >
          <View className="flex-row justify-between">
            <Text
              className="pl-4 pt-3 dark:text-white font-bold "
              style={{ fontSize: textS(12) }}
            >
              Your Recent Record
            </Text>
            <TouchableOpacity
              className=" "
              onPress={() => navigation.navigate("Results", { item: items })}
            >
              <Text
                className="pt-3 pr-4 font-bold "
                style={{ fontSize: textS(12), color: "#1cc910" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 bg-slate-200 border-2 border-slate-400 dark:bg-[#131f29] dark:border-2 dark:border-slate-400  m-3 rounded-3xl  ">
            <View className="flex-row justify-between p-4  ">
              <Text className="dark:text-white" style={{ fontSize: textS(10) }}>
                Height: {recentRecord.height} CM
              </Text>
              <Text className="dark:text-white" style={{ fontSize: textS(10) }}>
                Weight: {recentRecord.bmi} KG
              </Text>
            </View>

            <View className=" flex-1 justify-center items-center p-3">
              <Text
                className="font-bold dark:text-white"
                style={{ fontSize: textS(20) }}
              >
                BMI: {recentRecord.bmi}
              </Text>
              <Text
                className="font-bold dark:text-white"
                style={{ fontSize: textS(14) }}
              >
                Classification: {recentRecord.classification}
              </Text>
            </View>

            <View className=" flex-row justify-between  ">
              <Text
                className="px-4 pb-2 pt-3 dark:text-white"
                style={{ fontSize: textS(10) }}
              >
                Date: {recentRecord.date}
              </Text>
              <Text
                className="px-4 pb-2 pt-3 dark:text-white"
                style={{ fontSize: textS(10) }}
              >
                Time: {recentRecord.time}
              </Text>
            </View>

            <View className="justify-center items-center">
              <TouchableOpacity
                className=" "
                onPress={() =>
                  navigation.navigate("Details", { item: recentRecord })
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
          </View>
        </View>
      </View>
    </>
  );
}
