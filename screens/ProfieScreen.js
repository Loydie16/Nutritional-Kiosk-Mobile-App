import React, { useState, useEffect } from "react";
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
import { auth, firestoreDB } from "../config/firebase";
import Toast from "react-native-toast-message";
import {
  serverTimestamp,
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
import Modal from "react-native-modal";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function ProfileScreen() {
  const [gender, genderChecked] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalBirthdate, setOriginalBirthdate] = useState("");
  const [originalGender, setOriginalGender] = useState("");
  const [originalAge, setOriginalAge] = useState("");

  const toggleEditMode = () => {
    if (editMode) {
      // If edit mode is being cancelled, revert username
      setUsername(originalUsername);
      setFormattedDate(originalBirthdate);
      genderChecked(originalGender);
      setAge(originalAge);
    }
    setEditMode(!editMode);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

  const showResetToast = () => {
    Toast.show({
      type: "success",
      text1: `Reset Password Link Sent 🥳`,
      text2: "Logged out due to password reset.",
      duration: 5000,
    });
  };

  const showUpdateToast = () => {
    Toast.show({
      type: "success",
      text1: `Updated Successfully 🥳`,
      text2: "Profile has been updated!",
      duration: 5000,
    });
  };


  const resetPass = async () => {
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        showResetToast();
        signOut(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // ..
      });
  };

    const updateData = async () => {
      const docRef = doc(firestoreDB, "users", auth.currentUser.uid);
      const updates = {
        username: username,
        birthdate: formattedDate,
        age: age,
        gender: gender,
      };

      try {
        await updateDoc(docRef, updates);
        setEditMode(false);
        showUpdateToast();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };


   useEffect(() => {
    const docRef = doc(firestoreDB, "users", auth.currentUser.uid);
    const usersRef = collection(firestoreDB, "users");

    const getUserData = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const fetchedUsername = userData.username;
          const fetchedEmail = auth.currentUser.email;
          const fetchedBirthdate = userData.birthdate;
          const fetchedAge = userData.age; 
          const fetchedGender = userData.gender;

          setOriginalUsername(fetchedUsername);
          setOriginalBirthdate(fetchedBirthdate);
          setOriginalGender(fetchedGender);
          setOriginalAge(fetchedAge);
          setUsername(fetchedUsername);
          setEmail(fetchedEmail);
          setFormattedDate(fetchedBirthdate);
          setAge(fetchedAge);
          genderChecked(fetchedGender);
          setLoading(false);
        } else {
          console.log("No such document!");
          // Handle the case where the document doesn't exist yet
        }
      },
      (error) => {
        console.error("Error fetching username:", error);
      }
    );

    
   }, []);

  

  return (
    <>
      <ScrollView className="flex-1 dark:bg-[#000000]">
        <View className="flex-1 m-2 rounded-2xl  bg-slate-200 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <View className="form space-y-2   ">
            <View className="px-5 pt-2  ">
              <View className="flex-row items-center justify-between">
                <Text className=" text-l dark:text-white ">Username</Text>
                <TouchableOpacity onPress={toggleEditMode}>
                  <Text
                    style={{
                      color: editMode ? "#fc3f7b" : "#1e81b0",
                      fontSize: 18,
                      marginRight: 15,
                      marginBottom: 5,
                    }}
                  >
                    {editMode ? "Cancel" : "Edit"}{" "}
                    {editMode ? (
                      <Icon name="x-square" size={15} />
                    ) : (
                      <Icon name="edit" size={15} />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
              <PaperTextInput
                className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
                cursorColor="black"
                selectionColor="black"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                disabled={!editMode}
                value={username}
                onChangeText={setUsername}
                right={
                  editMode ? (
                    <PaperTextInput.Icon icon="account" />
                  ) : (
                    <PaperTextInput.Icon disabled icon="account" />
                  )
                }
              />
            </View>
            <View className="px-5 pt-2 ">
              <View className="flex flex-row ">
                <Text className=" self-center text-l dark:text-white ">
                  Email
                </Text>
                <View className="px-4 py-1 bg-green-500 rounded-xl ml-4">
                  <Text>
                    Verified <Icon name="check-circle" size={15} />
                  </Text>
                </View>
              </View>
              <PaperTextInput
                className="bg-gray-300 text-black rounded-xl border-2 border-transparent mt-2  "
                cursorColor="black"
                selectionColor="black"
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                editable={false}
                value={email}
                right={
                  <PaperTextInput.Icon
                    onPress={() => {
                      editMode &&
                        Toast.show({
                          type: "info",
                          text1: "Email cannot be changed",
                          text2: "Please contact support for assistance.",
                          duration: 5000,
                        });
                    }}
                    icon="email"
                  />
                }
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
                onChangeText={setFormattedDate}
                value={formattedDate}
                right={
                  <PaperTextInput.Icon
                    disabled={!editMode}
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
              <View className="flex-1 items-start -ml-2 mr-16 dark:bg-slate-400 dark:rounded-xl">
                <View className="flex-row items-center   ">
                  <RadioButton
                    value="Male "
                    color="skyblue"
                    disabled={!editMode}
                    status={gender === "Male" ? "checked" : "unchecked"}
                    onPress={() => genderChecked("Male")}
                  />
                  <TouchableOpacity
                    disabled={!editMode}
                    onPress={() => genderChecked("Male")}
                  >
                    <Text className="text-xl dark:text-white">Male</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center ">
                  <RadioButton
                    value="Female"
                    color="pink"
                    disabled={!editMode}
                    status={gender === "Female" ? "checked" : "unchecked"}
                    onPress={() => genderChecked("Female")}
                  />
                  <TouchableOpacity
                    disabled={!editMode}
                    onPress={() => genderChecked("Female")}
                  >
                    <Text className="text-xl dark:text-white">Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="items-center justify-center m-4">
              {editMode && ( // Conditionally render the button only if editMode is true
                <TouchableOpacity
                  className="p-4 bg-green-400 rounded-xl"
                  onPress={updateData}
                >
                  <Text>
                    <Icon name="save" size={15} /> Save Changes
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View className="flex-1 m-2 rounded-2xl bg-slate-200 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <View className="form space-y-2   ">
            <View className="px-5 pt-2">
              <Text className=" text-xl dark:text-white ">Change Password</Text>
              <Text className=" my-4 text-xs text-gray-500 dark:text-gray-400">
                Click the button to send a reset password link to your email.
              </Text>
            </View>

            <View className="px-5 pt-2 items-center justify-center m-4">
              <TouchableOpacity
                className="p-4 bg-red-400 rounded-xl"
                onPress={toggleModal}
              >
                <Text>
                  <Icon name="rotate-cw" size={15} /> Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"fadeInUp"}
        animationInTiming={500}
      >
        <View className="items-center justify-center bg-white border-2 border-slate-400 rounded-2xl p-6 dark:bg-[#232323] dark:border-2 dark:border-slate-400 ">
          <Text className="text-xl self-center justify-center tracking-wide leading-2 text-center dark:text-white">
            Are you sure you want to reset your password?
          </Text>
          <View className="flex-row justify-evenly mt-10 w-full h-10 ">
            <TouchableOpacity
              className="bg-red-400 rounded-xl w-24 items-center justify-center"
              title="Hide modal"
              onPress={resetPass}
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
    </>
  );
}
