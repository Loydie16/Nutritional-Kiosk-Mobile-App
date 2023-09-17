import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput,  ScrollView  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView>
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg2 }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image source={require('../assets/images/logo.png')} style={{ width: 350, height: 350 }} />
        </View>
      </SafeAreaView>

      <View style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }} className="flex-1 bg-white px-8 pt-8">
        <SafeAreaView className="flex">
          <View className="form space-y-2">
            <View className="flex justify-center items-center mb-2">
              <Text className="text-4xl font-bold text-gray-500">Sign Up</Text>
            </View>

            <Text className="text-gray-700 ml-4">Username</Text>
            <TextInput
              className="p-4 bg-gray-400 text-gray-1000 rounded-2xl mb-3"
              placeholder="Enter your username"
            />

            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-400 text-gray-1000 rounded-2xl mb-3"
              placeholder="Enter your email"
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-400 text-gray-1000 rounded-2xl"
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
            />
            
            <TextInput
              className="p-4 bg-gray-400 text-gray-1000 rounded-2xl"
              secureTextEntry={!showPassword}
              placeholder="Confirm your password"
            />
            
            <View className="flex flex-row items-start mb-4">
              <Checkbox value={showPassword} onValueChange={setShowPassword} />
              <Text>Show password</Text>
            </View>

            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" style={{ backgroundColor: themeColors.bg2 }}>
              <Text className="text-3xl font-bold text-center text-gray-700 text-white">
                Create account
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-500" style={{ color: themeColors.bg2 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
    </ScrollView>
  );
}
