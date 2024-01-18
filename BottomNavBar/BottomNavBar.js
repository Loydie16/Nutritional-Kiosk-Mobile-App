import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Home, Profile, BMIScreen, QRScanner, SettingScreen } from "../screens";
import Icon from "react-native-vector-icons/Feather";
import { useColorScheme } from "../theme/colorScheme";

export default function BottomNavBar() {
  const Tab = createBottomTabNavigator();
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: colorScheme === "dark" ? "#ecf3ff" : "#1e81b0",
          tabBarInactiveTintColor:
            colorScheme === "dark" ? "#5e5e65" : "#5e5e65",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#151c22" : "#ffffff",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            headerShown: false,

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="BMI Screen"
          component={BMIScreen}
          options={{
            tabBarLabel: "BMI Calc",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calculator"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="QRScanner"
          component={QRScanner}
          options={{
            tabBarLabel: "Scan",
            headerTintColor: colorScheme === "dark" ? "#ffffff" : "#151c22",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#151c22" : "#ffffff",
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "Account Information",
            tabBarLabel: "Account",
            headerTintColor: colorScheme === "dark" ? "#ffffff" : "#151c22",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#151c22" : "#ffffff",
            },
            headerRight: () => (
              <TouchableOpacity>
                <Text
                  style={{ color: "#1e81b0", fontSize: 18, marginRight: 15 }}
                >
                  Edit <Icon name="edit" size={15} />
                </Text>
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: "Settings",
            headerTintColor: colorScheme === "dark" ? "#ffffff" : "#151c22",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#151c22" : "#ffffff",
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
