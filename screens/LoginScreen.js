import { View, Text, TouchableOpacity, Image, TextInput,  ScrollView  } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView} from 'react-native-safe-area-context';
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen ()  {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
    return (
      <ScrollView>
      <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg1}}>
        
        <SafeAreaView  className="flex ">
            <View  className="flex-row justify-center">
                <Image source={require('../assets/images/logo.png')} 
                style={{width: 400, height: 400}} />
            </View>
        </SafeAreaView>

        <View style={{borderTopLeftRadius: 60, borderTopRightRadius: 60}} className="flex-1 bg-white px-8 pt-8">
        <SafeAreaView  className="flex ">
          <View className="form space-y-2">
          

            <View className="flex justify-center items-center mb-4">
                <Text className="text-4xl font-bold text-gray-500">Login</Text>
            </View>

            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-400 text-gray-1000 rounded-2xl mb-3"
              placeholder="Enter your email"
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput className="flex-1 p-4 bg-gray-400 text-gray-1000 rounded-2xl"
                
                secureTextEntry={!passwordVisible}
                placeholder="Enter your password"
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

            <View className="flex-row justify-center mt-12">
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
            </SafeAreaView>
          </View>
          
      </View>
      </ScrollView>
    )
  }
