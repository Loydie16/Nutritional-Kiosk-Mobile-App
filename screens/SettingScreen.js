import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react-native";
import Icon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import { useColorScheme } from "../theme/colorScheme";
import { setTheme, removeTheme } from "../utils/asyncStorageTheme";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Toast from "react-native-toast-message";

export default function SettingScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const darkTheme = () => {
    toggleColorScheme();
    setTheme("darken", "1");
  };

  const lightTheme = async () => {
    toggleColorScheme();
    await removeTheme("darken");
  };

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

  const showLogoutToast = () => {
    Toast.show({
      type: "success",
      text1: `Goodbye! 👋`,
      text2: "Successfully Logged Out!",
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    showLogoutToast();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View className="flex-1 flex-col space-y-3 p-4 dark:bg-[#000000]">
      <TouchableOpacity
        onPress={() => {
          if (colorScheme === "dark") {
            // Switch to light theme
            lightTheme();
          } else {
            // Switch to dark theme
            darkTheme();
          }
        }}
        className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400  "
      >
        <View className="px-4 flex-row items-center justify-center">
          <Icon
            name="moon"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
          <Text className="text-xl dark:text-white"> Dark Mode </Text>
        </View>
        <View className="px-4">
          <Switch
            value={colorScheme === "dark"}
            onValueChange={(value) => {
              if (value) {
                // Dark theme is selected
                darkTheme();
              } else {
                // Light theme is selected
                lightTheme();
              }
            }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
        <View className="px-4 flex-row items-center justify-center">
          <Icon
            name="alert-circle"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
          <Text className="text-xl dark:text-white"> About App</Text>
        </View>
        <View className="px-4">
          <Icon
            name="chevron-right"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
        <View className="px-4 flex-row items-center justify-center">
          <Icon
            name="help-circle"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
          <Text className="text-xl dark:text-white"> Help and Support </Text>
        </View>
        <View className="px-4">
          <Icon
            name="chevron-right"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
        <View className="px-4 flex-row items-center justify-center">
          <Icon
            name="file-text"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
          <Text className="text-xl dark:text-white"> Terms & Conditions</Text>
        </View>
        <View className="px-4">
          <Icon
            name="chevron-right"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
        <View className="px-4 flex-row items-center justify-center">
          <Icon
            name="git-merge"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
          <Text className="text-xl dark:text-white"> Version </Text>
        </View>
        <View className="px-4">
          <Text className="text-l dark:text-white">1.0.0</Text>
        </View>
      </TouchableOpacity>

      <View className="flex-1" />

      <TouchableOpacity
        className="flex-row items-center justify-between rounded-2xl h-16 bg-red-400 border-2 border-red-600"
        onPress={toggleModal}
      >
        <View className="px-4 flex-row items-center justify-center">
          <Icon
            name="log-out"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
          <Text className="text-xl dark:text-white"> Logout </Text>
        </View>
        <View className="px-4">
          <Icon
            name="chevron-right"
            size={20}
            color={colorScheme === "dark" ? "#ffffff" : "#000"}
          />
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"fadeInUp"}
        animationInTiming={500}
      >
        <View className="items-center justify-center bg-white border-2 border-slate-400 rounded-2xl p-6 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <Text className="text-xl self-center justify-center dark:text-white">
            Are you sure you want to logout?
          </Text>
          <View className="flex-row justify-evenly mt-10 w-full h-10 ">
            <TouchableOpacity
              className="bg-red-400 rounded-xl w-24 items-center justify-center"
              title="Hide modal"
              onPress={handleLogout}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-400 rounded-xl w-24 items-center justify-center"
              title="Hide modal"
              onPress={toggleModal}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
