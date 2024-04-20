import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import DetailsScreen from "../screens/DetailsScreen";
import ResultScreen from "../screens/ResultScreen";
import ForgotPass from "../screens/ForgotPass";
import TermsAgreementsScreen from "../screens/TermsAgreementsScreen.js";
import HelpSupport from "../screens/HelpSupport.js";
import AboutApp from "../screens/AboutApp.js";
import { getItem } from "../utils/asyncStorage.js";
import { useColorScheme } from "../theme/colorScheme";
import useAuth from "../hooks/useAuth";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user, loading } = useAuth();

  const { colorScheme } = useColorScheme();

  const [showOnboarding, setShowOnboarding] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    setShowOnboarding(onboarded !== "1");
  };

  if (showOnboarding === null) {
    return null;
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
        }}
      >
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#ffffff" : "#000000"}
        />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            user ? "BottomNavBar" : showOnboarding ? "Onboarding" : "Login"
          }
        >
          {user ? (
            <>
              <Stack.Screen
                name="BottomNavBar"
                options={{ headerShown: false }}
                component={BottomNavBar}
              />
              <Stack.Screen
                name="Details"
                options={{
                  headerShown: true,
                  title: "Recommendation",
                  headerTintColor:
                    colorScheme === "dark" ? "#ffffff" : "#151c22",
                  headerRight: () => (
                    <TouchableOpacity className="mr-2" onPress={toggleModal}>
                      <Icon
                        name="info"
                        size={24}
                        color={colorScheme === "dark" ? "#ffffff" : "#151c22"}
                      />
                    </TouchableOpacity>
                  ),
                  headerStyle: {
                    backgroundColor:
                      colorScheme === "dark" ? "#151c22" : "#ffffff",
                  },
                }}
                component={DetailsScreen}
              />
              <Stack.Screen
                name="Results"
                options={{
                  headerShown: true,
                  title: "Previous Result",
                  headerTintColor:
                    colorScheme === "dark" ? "#ffffff" : "#151c22",
                  headerStyle: {
                    backgroundColor:
                      colorScheme === "dark" ? "#151c22" : "#ffffff",
                  },
                }}
                component={ResultScreen}
              />
              <Stack.Screen
                name="TermsAgreements"
                options={{
                  headerShown: true,
                  title: "Terms & Conditions",
                  headerTintColor:
                    colorScheme === "dark" ? "#ffffff" : "#151c22",
                  headerStyle: {
                    backgroundColor:
                      colorScheme === "dark" ? "#151c22" : "#ffffff",
                  },
                }}
                component={TermsAgreementsScreen}
              />

              <Stack.Screen
                name="HelpSupport"
                options={{
                  headerShown: true,
                  title: "Help & Support",
                  headerTintColor:
                    colorScheme === "dark" ? "#ffffff" : "#151c22",
                  headerStyle: {
                    backgroundColor:
                      colorScheme === "dark" ? "#151c22" : "#ffffff",
                  },
                }}
                component={HelpSupport}
              />

              <Stack.Screen
                name="AboutApp"
                options={{
                  headerShown: true,
                  title: "About App",
                  headerTintColor:
                    colorScheme === "dark" ? "#ffffff" : "#151c22",
                  headerStyle: {
                    backgroundColor:
                      colorScheme === "dark" ? "#151c22" : "#ffffff",
                  },
                }}
                component={AboutApp}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Onboarding"
                options={{ headerShown: false }}
                component={OnboardingScreen}
              />
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUpScreen}
              />
              <Stack.Screen
                name="ForgotPass"
                options={{ headerShown: false }}
                component={ForgotPass}
              />
              <Stack.Screen
                name="TermsAgreements"
                options={{
                  headerShown: true,
                  title: "Terms & Conditions",
                }}
                component={TermsAgreementsScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"fadeInUp"}
        animationInTiming={1000}
      >
        <View className="items-center justify-center bg-white border-2 border-slate-400 rounded-2xl p-6 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <Text className="text-lg self-center justify-center tracking-wide leading-2  dark:text-white">
            This recommendation that is generated by artificial intelligence
            with the approval of a licensed nutritionist, serves only as a
            recommendation or guidance. However, it's essential to consult with
            a real nutritionist or doctor for a personalized advice.
          </Text>
        </View>
      </Modal>
    </>
  );
}
