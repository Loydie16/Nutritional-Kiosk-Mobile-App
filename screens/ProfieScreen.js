import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Button } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { textS, widthRatio, heightRatio, moderateScale } from '../utils/sizes';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

export default function ProfileScreen() {

  const [gender, genderChecked] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    
    // Format the date
    const dateString = currentDate.toLocaleDateString();
    setFormattedDate(dateString);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
    <ScrollView className="flex-1">
      <View className="flex-1 m-2 rounded-2xl  bg-slate-200  ">
        <View className="form space-y-2   ">
          <View className="px-5 pt-2  ">
            <Text className=" text-l  ">
              Username:
            </Text>
            <PaperTextInput
              className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
              activeUnderlineColor='transparent'
              underlineColor='transparent'  
              disabled={true}     
              value='Johndoe'
              right={
                <PaperTextInput.Icon   
                  icon='account'
                />
              }
            />         
          </View> 
          <View className="px-5 pt-2 ">
            <Text className=" text-l  ">
              Email:
            </Text>
            <PaperTextInput
              className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
              activeUnderlineColor='transparent'
              underlineColor='transparent'  
              disabled={true}     
              value='Johndoe@gmail.com'
              right={
                <PaperTextInput.Icon   
                  icon='email'
                />
              }
            />                 
          </View>
          <View className="px-5 pt-2 ">
            <Text className=" text-l  ">
              Birthdate:
            </Text>
    
            <PaperTextInput
              className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
              activeUnderlineColor='transparent'
              underlineColor='transparent'  
              disabled={true}     
              value={formattedDate}
              right={
                <PaperTextInput.Icon   
                  icon='cursor-default-click'
                  onPress={() => showDatepicker()}
                />
              }
            /> 
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <View className="px-5 pt-2 mb-4">
            <Text className="text-l">
              Gender:
            </Text>
              <View className="flex-row justify-evenly items-center">
                <RadioButton
                  value="first"
                  color='skyblue'
                  status={ gender === 'first' ? 'checked' : 'unchecked' }
                  onPress={() => genderChecked('first')}
                />
                <Text className="text-xl">Male</Text>
                <RadioButton
                  value="second"
                  color='pink'
                  status={ gender === 'second' ? 'checked' : 'unchecked' }
                  onPress={() => genderChecked('second')}
                />
                <Text className="text-xl">Female</Text>
              </View>            
          </View>
        </View>
      </View>

      <View className="flex-1 m-2 rounded-2xl  bg-slate-200  ">
        <View className="form space-y-2   ">
          <View className="flex-row px-5 pt-2 items-center justify-between  ">
            <Text className=" text-xl  ">
              Change Password
            </Text>
            <TouchableOpacity>
              <Icon name="edit-3" size={moderateScale(20)} color="#000" />
            </TouchableOpacity>
          </View>
          <View className="px-5 ">
            <PaperTextInput
              className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
              placeholder='Old Password'
              activeUnderlineColor='transparent'
              underlineColor='transparent'  
              disabled={true}        
              right={
                <PaperTextInput.Icon   
                  icon='lock-remove'
                />
              }
            />    
            <PaperTextInput
              className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
              placeholder='New Password'
              activeUnderlineColor='transparent'
              underlineColor='transparent'  
              disabled={true}     
              right={
                <PaperTextInput.Icon   
                  icon='lock-reset'
             
                />
              }
            />  
            <PaperTextInput
              className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
              placeholder='Confirm New Password'
              activeUnderlineColor='transparent'
              underlineColor='transparent'  
              disabled={true}     
              right={
                <PaperTextInput.Icon   
                  icon='lock-check-outline'
                />
              }
            />
            
          </View>  
          <View className="flex-row mb-4 ml-5">
            <Checkbox value={showPassword} onValueChange={setShowPassword} />
            <Text> Show password</Text>
          </View>    
        </View>
      </View>
    </ScrollView>
    </>
  );
}
