import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput,  ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import Lottie from 'lottie-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter username'),
  
    email: Yup.string().email('Invalid email').required('Required'),

    password: Yup.string()
      .min(8)
      .required('Please enter password')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      ),
  });

  return (

    <ScrollView>
      <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }}
        
        validationSchema={SignupSchema}

        >
          {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
            <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg2 }}>
              <SafeAreaView className="flex">
                <View className="flex-row justify-center w-96 h-96">
                  <Lottie source={require('../assets/onboarding-animation/animation_lmozb2xr.json')} autoPlay loop
                        />
                </View>
              </SafeAreaView>

              <View style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }} className="flex-1 bg-white px-8 ">
                <SafeAreaView className="flex">
                  <View className="form space-y-2">
                    <View className="flex justify-center items-center ">
                      <Text className="text-4xl font-bold text-gray-500">Sign Up</Text>
                    </View>

                    <Text className="text-gray-700 ml-4">Username</Text>
                    
                    <View>
                    <TextInput
                      className="p-4 bg-gray-300 text-gray-1000 rounded-2xl "
                      placeholder="Enter your username"
                      value={values.userame}
                      onChangeText={handleChange('username')}
                      onBlur={() => setFieldTouched('username')}
                    />
                    {touched.username && errors.username && (
                      <Text className="text-red-400 ">{errors.username}</Text>
                    )}
                   </View>

                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <View>
                    <TextInput
                      className="p-4 bg-gray-300 text-gray-1000 rounded-2xl "
                      placeholder="Enter your email"
                      autoCapitalize={false}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                    />
                    {touched.email && errors.email && (
                      <Text className="text-red-400 ">{errors.email}</Text>
                    )}
                    </View>

                    <Text className="text-gray-700 ml-4">Password</Text>
                    
                    <TextInput
                      className="p-4 bg-gray-300 text-gray-1000 rounded-2xl"
                      secureTextEntry={!showPassword}
                      placeholder="Enter your password"
                    />
                    
                    <TextInput
                      className="p-4 bg-gray-300 text-gray-1000 rounded-2xl"
                      secureTextEntry={!showPassword}
                      placeholder="Confirm your password"
                    />
                    
                    
                    <View className="flex flex-row items-start mb-4">
                      <Checkbox value={showPassword} onValueChange={setShowPassword} />
                      <Text>Show password</Text>
                    </View>

                    <TouchableOpacity disabled={!isValid} className="py-3 bg-yellow-400 rounded-xl" style={{ backgroundColor: isValid ? themeColors.bg2 : 'A5C9CA'}}>
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
                  <View className="m-3"></View>
                </SafeAreaView>
              </View>
            </View>
            )}
          </Formik>
    </ScrollView>
  );
}
