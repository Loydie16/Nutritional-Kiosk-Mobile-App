import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar  } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView} from 'react-native-safe-area-context';
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { removeItem } from '../utils/asyncStorage';
import { TextInput as PaperTextInput } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';


export default function LoginScreen ()  {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  
  const handleReset = async ()=>{
    await removeItem('onboarded');
    navigation.push('Onboarding');
  }

  const SignupSchema = Yup.object().shape({
  
  
    email: Yup.string().email('Invalid email.').required('Required'),

    password: Yup.string()
      .min(8)
      .required('Required')
  });
  
    return (
      
      <ScrollView >
      <View className="flex-1 " style={{backgroundColor: themeColors.bg1}}>
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
        <><StatusBar
                backgroundColor="transparent"
                translucent={true} />
                <SafeAreaView className="flex items-center ">
                  <View className="flex-row justify-center w-96 h-96 " >
                    <Lottie source={require('../assets/onboarding-animation/animation_lmoz5alw.json')} autoPlay loop />
                  </View>
                </SafeAreaView>
                <View style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }} className="flex-1 bg-white px-8  " >
                  <View className="flex pt-8  " >
                    <View className="form space-y-2 " >


                      <View className="flex justify-center items-center ">
                        <Text className="text-4xl font-bold text-gray-500">Login</Text>
                      </View>

                      <Text className="text-gray-700 ml-4">Email Address</Text>
                      <View>
                      <PaperTextInput
                        className={`bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                          touched.email && errors.email ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="Enter your email" 
                        activeUnderlineColor='transparent'
                        underlineColor='transparent'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        right={
                          <PaperTextInput.Icon   
                            icon='email'
                          />
                        }
                      />
                        
                        {touched.email && errors.email && (
                          <Text className="text-red-400 ">{errors.email}</Text>
                        )}
                      </View>

                      <Text className="text-gray-700 ml-4">Password</Text>
                      <View>
                        
                          <PaperTextInput
                            className={`flex-1 bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                              touched.password && errors.password ? 'border-red-500' : 'border-transparent'
                            }`}
                            secureTextEntry={!passwordVisible}
                            right={
                              <PaperTextInput.Icon   
                                icon={passwordVisible ? 'eye-off' : 'eye'}
                                onPress={togglePasswordVisibility}
                              />
                            }
                            activeUnderlineColor='transparent'
                            underlineColor='transparent'
                            placeholder="Enter your password"
                            inlineImageLeft='search_icon' 
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                          />
                        
                       
                        {touched.password && errors.password && (
                          <Text className="text-red-400 ">{errors.password}</Text>
                        )}
                      </View>


                      <View className="flex items-end ">
                        <TouchableOpacity>
                          <Text className="text-gray-700 mb-5">Forgot Password?</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        className="py-3 bg-300 rounded-xl " style={{ backgroundColor: themeColors.bg1 }}
                        onPress={() => navigation.navigate('BottomNavBar')}>
                        <Text
                          className="text-3xl font-bold text-center text-700 text-white"
                        >
                          Login
                        </Text>
                      </TouchableOpacity>

                    </View>

                    <View className="row justify-center mt-12  items-center ">
                      <Text className="text-gray-500 font-semibold text-xl ">
                        Don't have an account?
                      </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-500 text-xl" style={{ color: themeColors.bg1 }}> Sign Up</Text>
                      </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center mt-7">
                      <Text className="text-gray-500 font-semibold text-m">
                        Read our
                      </Text>
                      <TouchableOpacity>
                        <Text className="font-semibold text-blue-500 text-m" onPress={handleReset}> Terms </Text>
                      </TouchableOpacity>
                      <Text className="text-gray-500 font-semibold text-m">
                        and
                      </Text>
                      <TouchableOpacity>
                        <Text className="font-semibold text-blue-500 text-m"> Agreements</Text>
                      </TouchableOpacity>
                    </View>
                    <View className="m-3"></View>
                  </View>
                </View></>
          
          )}
          </Formik>
      </View>
      </ScrollView>
    )
  }
