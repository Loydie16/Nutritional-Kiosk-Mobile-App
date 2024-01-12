import { View, Text, TouchableOpacity, BackHandler, Switch } from 'react-native'
import React, { useState, useEffect }from 'react'
import Lottie from 'lottie-react-native';
import Icon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import { useColorScheme } from 'nativewind';

export default function SettingScreen() {

  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  

  const handleBackPress = () => {
    if (isModalVisible) {
      setModalVisible(false);
      return true; // prevent default behavior (exit the app)
    }
    return false;
  };


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View className="flex-1 flex-col space-y-3 p-4">
      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300">
        <Text className="text-xl px-4">Account</Text>
        <View className="px-4">
          <Icon name="chevron-right" size={20} color="#000" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300">
        <Text className="text-xl px-4">Account</Text>
        <View className="px-4">
          <Icon name="chevron-right" size={20} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300">
        <Text className="text-xl px-4">Account</Text>
        <View className="px-4">
          <Icon name="chevron-right" size={20} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleColorScheme} className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300">
        <Text className="text-xl px-4">Dark Mode</Text>
        <View className="px-4">
          <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme}/>
        </View>
      </TouchableOpacity>

      <View className="flex-1" />
      
      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-red-400" onPress={toggleModal}>
        <Text className="text-xl px-4">Logout</Text>
        <View className="px-4">
          <Icon name="log-out" size={20} color="#000" />
        </View>
      </TouchableOpacity>

      <Modal 
        isVisible={isModalVisible} 
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"fadeInUp"}
        animationInTiming={500}
      >
        <View className="items-center justify-center bg-white rounded-2xl p-6">
          <Text className="text-xl self-center justify-center">Are you sure you want to logout?</Text>
          <View className="flex-row justify-evenly mt-10 w-full h-10 ">
            <TouchableOpacity className="bg-red-400 rounded-xl w-24 items-center justify-center" title="Hide modal" onPress={toggleModal} >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-400 rounded-xl w-24 items-center justify-center" title="Hide modal" onPress={toggleModal} >
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}