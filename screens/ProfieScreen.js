import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { TextInput as PaperTextInput, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { textS, widthRatio, heightRatio, moderateScale } from "../utils/sizes";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const [gender, genderChecked] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      // User dismissed the date picker, do nothing
      setShow(false);
      return;
    }

    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    // Format the date
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    const formattedDate = `${month}-${day}-${year}`;

    setFormattedDate(formattedDate);

    // Calculate and set the age
    const birthDate = new Date(currentDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setAge(age.toString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `Reset Password Link Sent 🥳`,
      text2: "Logged out due to password reset.",
      duration: 5000,
    });
  };


  const resetPass = async () => {
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        showToast();
        signOut(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // ..
      });
  };

  return (
    <>
      <ScrollView className="flex-1 dark:bg-[#000000]">
        <View className="flex-1 m-2 rounded-2xl  bg-slate-200 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <View className="form space-y-2   ">
            <View className="px-5 pt-2  ">
              <Text className=" text-l dark:text-white ">Username</Text>
              <PaperTextInput
                className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
                cursorColor="black"
                selectionColor="black"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                editable={false}
                value="Johndoe"
                right={<PaperTextInput.Icon icon="account" />}
              />
            </View>
            <View className="px-5 pt-2 ">
              <View className="flex flex-row ">
                <Text className=" self-center text-l dark:text-white ">
                  Email
                </Text>
                <View className="px-4 py-1 bg-green-500 rounded-xl ml-4">
                  <Text>Verified</Text>
                </View>
              </View>
              <PaperTextInput
                className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
                cursorColor="black"
                selectionColor="black"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                editable={false}
                value="Johndoe@gmail.com"
                right={<PaperTextInput.Icon icon="email" />}
              />
            </View>
            <View className="px-5 pt-2 ">
              <Text className=" text-l dark:text-white ">Birthdate</Text>

              <PaperTextInput
                className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
                style={{ textDecorationColor: "#4a4650" }}
                cursorColor="black"
                selectionColor="black"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                editable={false}
                value={formattedDate}
                right={
                  <PaperTextInput.Icon
                    icon="cursor-default-click"
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
            <View className=" px-5 pt-2 ">
              <Text className=" text-l dark:text-white ">Age | Gender</Text>
              {/* <Text className=" text-gray-700   ">Gender</Text> */}
            </View>
            <View className="flex-row  items-center px-5  mb-4 ">
              <PaperTextInput
                className="bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent"
                placeholder="0"
                placeholderTextColor={"#4a4650"}
                cursorColor="black"
                selectionColor="black"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                editable={false}
                value={age}
              />
              <Text className="pl-2 dark:text-white">years old</Text>
              <Divider
                style={{
                  height: "100%",
                  width: 2,
                  backgroundColor: "#4a4650",
                }}
                bold={true}
                horizontalInset={true}
              />
              <View className="flex-1 items-start -ml-2 ">
                <View className="flex-row items-center ">
                  <RadioButton
                    value="Male "
                    color="skyblue"
                    status={gender === "Male" ? "checked" : "unchecked"}
                    onPress={() => genderChecked("Male")}
                  />
                  <TouchableOpacity onPress={() => genderChecked("Male")}>
                    <Text className="text-xl dark:text-white">Male</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center">
                  <RadioButton
                    value="Female"
                    color="pink"
                    status={gender === "Female" ? "checked" : "unchecked"}
                    onPress={() => genderChecked("Female")}
                  />
                  <TouchableOpacity onPress={() => genderChecked("Female")}>
                    <Text className="text-xl dark:text-white">Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-1 m-2 rounded-2xl bg-slate-200 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <View className="form space-y-2   ">
            <View className="px-5 pt-2">
              <Text className=" text-xl dark:text-white ">Change Password</Text>
              <Text className=" my-4 text-xs text-gray-400 dark:text-gray-500">
                Click the button to send an reset password link to your email.
              </Text>
            </View>

            <View className="px-5 pt-2 items-center justify-center m-4">
              <TouchableOpacity className="p-4 bg-red-400 rounded-xl" onPress={resetPass}>
                <Text>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
