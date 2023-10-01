import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';


export default function ProfileScreen() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <ScrollView className="flex-1 bg-green-200">
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" translucent={true} />

        <View className="flex-1 gap-2 p-4">
          <View className="flex justify-center items-center">
            <Text className="text-4xl font-bold text-gray-500">Profile</Text>
          </View>

          <Text className="text-gray-700 ml-4">Email Address</Text>
          <View>
            <PaperTextInput
              className="flex-1 bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent"
              value={"youremail@email.com"}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              editable={false}
              left={<PaperTextInput.Icon icon={'email'} />}
            />
          </View>

          <Text className="text-gray-700 ml-4">Username</Text>
          <View>
            <PaperTextInput
              className="flex-1 bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent"
              value={"Your Username"}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              editable={false}
              left={<PaperTextInput.Icon icon={'account'} />}
            />
          </View>

          <Text className="text-gray-700 ml-4">Select your gender:</Text>
          <View className="flex-1 bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent">
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
            </Picker>
          </View>

          
          
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
