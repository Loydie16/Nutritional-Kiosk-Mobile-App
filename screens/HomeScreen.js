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
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { LineChart } from "react-native-chart-kit";
import { textS, widthRatio, heightRatio, moderateScale } from "../utils/sizes";
import { useColorScheme } from "../theme/colorScheme";
import { getTheme } from "../utils/asyncStorageTheme.js";
import { auth, firestoreDB } from "../config/firebase";
import {
  serverTimestamp,
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { sendEmailVerification, signOut } from "firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

export default function HomeScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const { colorScheme, setColorScheme } = useColorScheme();

  const [results, setResults] = useState([]); // Initialize results state
  const [recentResults, setRecentResults] = useState([]); // Initialize results state

  // Set the threshold for enabling scrolling
  const scrollableThreshold = 15;
  const isScrollable = results.length > scrollableThreshold;

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [noResults, setNoResults] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const docRef = doc(firestoreDB, "users", auth.currentUser.uid);
    const usersRef = collection(firestoreDB, "users");

    // Get a reference to the 'results' subcollection for a specific user (replace with actual user ID)
    const resultsRef = collection(usersRef, auth.currentUser.uid, "results");

    const getUsername = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const fetchedUsername = userData.username; // Replace with the actual field name
          setUsername(fetchedUsername);
          setLoading(false);
        } else {
          console.log("No such document!");
          // Handle the case where the document doesn't exist yet
        }
      },
      (error) => {
        console.error("Error fetching username:", error);
      }
    );

    const fetchResults = async () => {  
      try {
        const q = query(
          collection(firestoreDB, "users", auth.currentUser.uid, "results"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        // Check if the subcollection is empty
        if (querySnapshot.empty) {
          setResults([
            {
              bmi: 0,
              classification: "0",
              date: "0",
              height: 0,
              time: "0",
              weight: 0,
              recommendation: "0"
            },
          ]);
          setNoResults(false);
        } else {
          const fetchedResults = [];
          querySnapshot.forEach((doc) => {
            fetchedResults.push(doc.data());
          });
          setResults(fetchedResults);
          setRecentResults(fetchedResults.slice(0)[0]);
          setNoResults(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    fetchResults();

    return () => {
      getUsername();
    }; // Cleanup function to getUsername when the component unmounts
  }, []); // The empty dependency array ensures the useEffect runs only once on mount

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
        color="#FFFFFF"
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.50)"
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
                  {username}!
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
          {loading ? (
            <View className="items-center justify-center p-10">
              <Text className="dark:text-white">Loading...</Text>
            </View>
          ) : (
            <>
              {!noResults ? ( // Check if results are available
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="self-center"
                >
                  <LineChart
                    data={{
                      labels: results
                        .slice()
                        .reverse()
                        .map((item) => item.date),
                      datasets: [
                        {
                          data: results
                            .slice()
                            .reverse()
                            .map((item) => parseFloat(item.bmi)),
                          strokeWidth: 2,
                        },
                      ],
                    }}
                    width={
                      isScrollable ? 3000 : Dimensions.get("window").width - 25
                    }
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
              ) : (
                <View className="items-center justify-center p-10">
                  <Text className="dark:text-white">Loading...</Text>
                </View> // Render if no results are available
              )}
            </>
          )}
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
              onPress={() => navigation.navigate("Results", { item: results })}
            >
              <Text
                className="pt-3 pr-4 font-bold "
                style={{ fontSize: textS(12), color: "#1cc910" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <Text>Loading...</Text>
            </View>
          ) : recentResults &&
            Object.values(recentResults).every(
              (value) => value === 0 || value === "0"
            ) ? (
            <View className="flex-1 items-center justify-center bg-slate-200 border-2 border-slate-400 dark:bg-[#131f29] dark:border-2 dark:border-slate-400  m-3 rounded-3xl">
              <Text className="dark:text-white">No Recent Results</Text>
            </View>
          ) : (
            <View className="flex-1 bg-slate-200 border-2 border-slate-400 dark:bg-[#131f29] dark:border-2 dark:border-slate-400  m-3 rounded-3xl  ">
              <View className="flex-row justify-between p-4  ">
                <Text
                  className="dark:text-white"
                  style={{ fontSize: textS(10) }}
                >
                  Height: {recentResults.height} CM
                </Text>
                <Text
                  className="dark:text-white"
                  style={{ fontSize: textS(10) }}
                >
                  Weight: {recentResults.bmi} KG
                </Text>
              </View>

              <View className=" flex-1 justify-center items-center p-3">
                <Text
                  className="font-bold dark:text-white"
                  style={{ fontSize: textS(20) }}
                >
                  BMI: {recentResults.bmi}
                </Text>
                <Text
                  className="font-bold dark:text-white"
                  style={{ fontSize: textS(14) }}
                >
                  Classification: {recentResults.classification}
                </Text>
              </View>

              <View className=" flex-row justify-between  ">
                <Text
                  className="px-4 pb-2 pt-3 dark:text-white"
                  style={{ fontSize: textS(10) }}
                >
                  Date: {recentResults.date}
                </Text>
                <Text
                  className="px-4 pb-2 pt-3 dark:text-white"
                  style={{ fontSize: textS(10) }}
                >
                  Time: {recentResults.time}
                </Text>
              </View>

              <View className="justify-center items-center">
                <TouchableOpacity
                  className=" "
                  onPress={() =>
                    navigation.navigate("Details", { item: recentResults })
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
          )}
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeInUp"}
        animationInTiming={500}
      >
        <View className="items-center justify-center bg-white border-4 border-green-500 rounded-2xl p-6">
          <Text className="text-l self-center justify-center tracking-wide leading-2 text-center ">
            Email verification link has been sent to your email. Verify your
            email address first to proceed!
          </Text>
          <Text className="text-m self-center justify-center tracking-wide leading-2 text-center pt-4">
            Check your spam if you can't find it!
          </Text>
          <View className="flex-row justify-evenly mt-10 w-full h-10 ">
            <TouchableOpacity
              className="bg-green-400 rounded-xl  items-center justify-center px-3 "
              title="Hide modal"
              onPress={handleLogout}
            >
              <Text className="self-center justify-center tracking-wide leading-2 text-center">
                <Icon name="arrow-left" size={15} /> Back to login Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
