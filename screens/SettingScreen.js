import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import { useColorScheme } from "../theme/colorScheme";
import { setTheme, removeTheme } from "../utils/asyncStorageTheme";
import { signOut, deleteUser } from "firebase/auth";
import { auth, firestoreDB } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { TextInput as PaperTextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function SettingScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [isDeleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const navigation = useNavigation();

  const darkTheme = async () => {
    toggleColorScheme();
    await setTheme("darken", "1");
  };

  const lightTheme = async () => {
    toggleColorScheme();
    await removeTheme("darken");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDeleteModal = () => {
    setModalDeleteVisible(!isModalDeleteVisible);
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
      type: "info",
      text1: `Goodbye! 👋`,
      text2: "Successfully Logged Out!",
    });
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await signOut(auth);
      showLogoutToast();
    } catch (error) {
      // Handle error if necessary
      Toast.show({
        type: "error",
        text1: `Error logging out!`,
        text2: error + ". Please try again.",
      });
    } finally {
      setLoadingLogout(false); // Reset loading state
    }
  };

  const deleteAcc = async () => {
    const user = auth.currentUser;

    if (!user) {
      //console.log("No user is currently signed in.");
      return;
    }

    const userId = user.uid;

    deleteUser(user)
      .then(async () => {
        // Make the function async
        await deleteDoc(doc(firestoreDB, "users", userId));
        Toast.show({
          type: "success",
          text1: `Successfully deleted account!`,
          text2: "Sad to see you go! 😢",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Error deleting account!`,
          text2: error.code + " Log out and try again.",
        });
      });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // Enable or disable the delete button based on the text input value
    setDeleteButtonEnabled(deleteInputValue === "delete");
  }, [deleteInputValue]);

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

      <TouchableOpacity
        className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 "
        onPress={() => navigation.navigate("AboutApp")}
      >
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

      <TouchableOpacity
        className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 "
        onPress={() => navigation.navigate("HelpSupport")}
      >
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

      <TouchableOpacity
        className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 "
        onPress={() => navigation.navigate("TermsAgreements")}
      >
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

      <TouchableOpacity
        className="flex-row items-center justify-between rounded-2xl h-16 bg-slate-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 "
        onPress={() => {
          Toast.show({
            type: "info",
            text1: `You're up to date! 🚀`,
            text2: "Version 1.0.0",
          });
        }}
      >
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

      <View className="flex-row justify-between">
        <TouchableOpacity
          className="flex-row items-center justify-between rounded-2xl h-16 bg-red-700 border-2 border-red-600"
          onPress={toggleDeleteModal}
        >
          <View className="px-4 flex-row items-center justify-center">
            <Icon
              name="trash-2"
              size={20}
              color={colorScheme === "dark" ? "#ffffff" : "#000"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between rounded-2xl h-16 bg-red-400 border-2 border-red-500"
          onPress={toggleModal}
        >
          <View className="px-8 flex-row items-center justify-center">
            <Icon
              name="log-out"
              size={20}
              color={colorScheme === "dark" ? "#ffffff" : "#000"}
            />
            <Text className="text-xl dark:text-white"> Logout </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"fadeInUp"}
        animationInTiming={500}
      >
        <View className="items-center justify-center bg-white border-2 border-slate-400 rounded-2xl p-6 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <Text className="text-xl self-center justify-center tracking-wide leading-2 text-center dark:text-white">
            Are you sure you want to logout?
          </Text>
          <View className="flex-row justify-evenly mt-10 w-full h-10 ">
            <TouchableOpacity
              className="bg-red-400 rounded-xl w-24 items-center justify-center"
              title="Hide modal"
              onPress={handleLogout}
            >
              {loadingLogout ? (
                // If loading is true, show the activity indicator
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                <Text>Yes</Text>
              )}
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

      <Modal
        isVisible={isModalDeleteVisible}
        animationIn={"fadeInUp"}
        animationInTiming={500}
      >
        <View className="items-center justify-center bg-white border-2 border-slate-400 rounded-2xl p-6 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <Text className="text-xl self-center justify-center tracking-wide leading-2 text-center dark:text-white">
            Are you sure you want to delete your account?
          </Text>
          <View className="flex-row items-center justify-between py-6 px-4">
            <PaperTextInput
              className={
                "w-full bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent "
              }
              placeholder='Type "delete"'
              cursorColor="black"
              selectionColor="black"
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              value={deleteInputValue}
              onChangeText={(text) => setDeleteInputValue(text)}
              autoCapitalize="none"
            />
          </View>
          <View className="flex-row justify-evenly w-full h-10 ">
            <TouchableOpacity
              className={`flex-row bg-red-400 rounded-xl w-24 items-center justify-center ${
                isDeleteButtonEnabled ? "" : "opacity-40"
              }`}
              title="Hide modal"
              onPress={() => {
                if (isDeleteButtonEnabled) {
                  deleteAcc(); // Invoke deleteAcc function
                  setDeleteInputValue(""); // Clear the value of deleteInputValue
                  toggleDeleteModal(); // Close the modal
                }
              }}
              disabled={!isDeleteButtonEnabled}
            >
              <Icon
                name="alert-octagon"
                size={20}
                color={colorScheme === "dark" ? "#ffffff" : "#000"}
              />
              <Text> Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-400 rounded-xl w-24 items-center justify-center"
              title="Hide modal"
              onPress={() => {
                setDeleteInputValue(""); // Clear the value of deleteInputValue
                toggleDeleteModal(); // Close the modal
              }}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
