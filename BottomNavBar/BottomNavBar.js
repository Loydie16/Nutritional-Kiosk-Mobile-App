import { View, Text, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Home, Profile, BMIScreen, QRScanner } from "../screens";




export default function BottomNavBar() {
    
    const Tab = createBottomTabNavigator();

    function LogoutScreen(){

    }

    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#1e81b0',
          }}       
        >

          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
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
              tabBarLabel: 'BMI Calc',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calculator" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="QRScanner"
            component={QRScanner}
            options={{
              tabBarLabel: 'Scan',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="qrcode-scan" color={color} size={size}  />
              ),
              
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
              
            }}
          />

          <Tab.Screen
            name="Settings"
            component={LogoutScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cog" color={color} size={size} />
              ),
              
            }}
          />
          
          
        </Tab.Navigator>
      );
    }

