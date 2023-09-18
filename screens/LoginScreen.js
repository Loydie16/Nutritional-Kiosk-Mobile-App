import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar  } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView} from 'react-native-safe-area-context';
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';


export default function LoginScreen ()  {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
    return (
      
      <ScrollView>
      <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg1}}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
        <SafeAreaView  className="flex ">
            <View  className="flex-row justify-center w-96 h-96">
            <Lottie source={require('../assets/onboarding-animation/animation_lmoz5alw.json')} autoPlay loop
                />
            </View>
        </SafeAreaView>

        <View style={{borderTopLeftRadius: 60, borderTopRightRadius: 60}} className="flex-1 bg-white px-8 ">
        <SafeAreaView  className="flex ">
          <View className="form space-y-2">
          

            <View className="flex justify-center items-center ">
                <Text className="text-4xl font-bold text-gray-500">Login</Text>
            </View>

            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-300 text-gray-1000 rounded-2xl mb-3"
              placeholder="Enter your email"
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput className="flex-1 p-4 bg-gray-300 text-gray-1000 rounded-2xl"
                
                secureTextEntry={!passwordVisible}
                placeholder="Enter your password"
                inlineImageLeft='search_icon'
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={{ marginLeft: -30 }}>
                <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24}  />
              </TouchableOpacity>
            </View>


            <View className="flex items-end">
              <TouchableOpacity>
                <Text className="text-gray-700 mb-5">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              className="py-3 bg-300 rounded-xl" style={{backgroundColor: themeColors.bg1}}>
                <Text 
                    className="text-3xl font-bold text-center text-700 text-white" 
                >
                        Login
                </Text>
             </TouchableOpacity>

            </View>

            <View className="flex-row justify-center mt-12">
              <Text className="text-gray-500 font-semibold text-xl">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-500 text-xl" style={{color: themeColors.bg1}}> Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold text-m">
                  Read our
              </Text>
              <TouchableOpacity>
                  <Text className="font-semibold text-blue-500 text-m"> Terms </Text>
              </TouchableOpacity>
              <Text className="text-gray-500 font-semibold text-m">
                   and
              </Text>
              <TouchableOpacity>
                  <Text className="font-semibold text-blue-500 text-m"> Agreements</Text>
              </TouchableOpacity>
            </View>
            <View className="m-3"></View>
            </SafeAreaView>
          </View>
          
          
      </View>
      </ScrollView>
    )
  }
