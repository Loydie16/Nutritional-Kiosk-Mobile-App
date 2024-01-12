import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import Lottie from "lottie-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput as PaperTextInput, Divider } from "react-native-paper";
import { RadioButton } from "react-native-paper";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [gender, genderChecked] = useState("Male");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [age, setAge] = useState("");

  const onChange = (event, selectedDate) => {

    if (event.type === 'dismissed') {
      // User dismissed the date picker, do nothing
      setShow(false);
      return;
    }

    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    // Format the date
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
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

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter username."),

    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .test("is-complete-email", "Email must be complete", function (value) {
        // Use a regex pattern to check for a complete email address
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      }),

    password: Yup.string()
      .min(8, "Your password is too short. ")
      .required("Please enter password. ")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      ),

    confirmPassword: Yup.string()
      .min(8, "Confirm password must be 8 characters long.")
      .required(" Please enter confirm password.")
      .oneOf([Yup.ref("password")], " Your password do not match."),

    birthDate: Yup.date()
      .max(new Date(), "Please enter your birthdate.")
      .required("Please enter your birthdate."),

  });

  return (

    <ScrollView>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          birthDate: new Date(),
          
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          setFieldValue,
          isValid,
          handleSubmit,
        }) => (
          <View
            className="flex-1 bg-white"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <SafeAreaView className="flex items-center ">
              <View className="flex-row justify-center w-96 h-96 ">
                <Lottie
                  source={require("../assets/onboarding-animation/animation_lmozb2xr.json")}
                  autoPlay
                  loop
                />
              </View>
            </SafeAreaView>

            <View
              style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
              className="flex-1 bg-white px-8 "
            >
              <SafeAreaView className="flex">
                <View className="form space-y-2">
                  <View className="flex justify-center items-center ">
                    <Text className="text-4xl font-bold text-gray-500">
                      Sign Up
                    </Text>
                  </View>

                  <Text className="text-gray-700 ml-4">Username</Text>

                  <View>
                    <PaperTextInput
                      className={` bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                        touched.username && errors.username
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                      placeholder="Enter your username"
                      value={values.username}
                      onChangeText={handleChange("username")}
                      onBlur={() => setFieldTouched("username")}
                    />
                    {touched.username && errors.username && (
                      <Text className="text-red-400 ">{errors.username}</Text>
                    )}
                  </View>

                  <Text className="text-gray-700 ml-4">Email Address</Text>
                  <View>
                    <PaperTextInput
                      className={` bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                      placeholder="Enter your email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                    />
                    {touched.email && errors.email && (
                      <Text className="text-red-400 ">{errors.email}</Text>
                    )}
                  </View>

                  <Text className=" text-gray-700 ml-4  ">Birthdate</Text>

                  <View className=" ">
                    <PaperTextInput
                      className={`bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                        touched.birthDate && errors.birthDate
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                      placeholder="MM-DD-YYYY"
                      placeholderTextColor={"#4a4650"}
                      activeUnderlineColor="transparent"
                      underlineColor="transparent"
                      disabled={true}
                      
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
                    {touched.birthDate && errors.birthDate && (
                      <Text className="text-red-400 ">{errors.birthDate}</Text>
                    )}
                  </View>

                  <View className="flex-row justify-between  ">
                    <Text className=" text-gray-700 ml-4  ">Age | Gender</Text>
                    {/* <Text className=" text-gray-700   ">Gender</Text> */}
                    
                  </View>

                  <View className="flex-row  items-center ">
                    <PaperTextInput
                      className="bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent"
                      style={{ textDecorationColor: "#4a4650" }}
                      placeholder="0"
                      placeholderTextColor={"#4a4650"}
                      activeUnderlineColor="transparent"
                      underlineColor="transparent"
                      disabled={true}
                      value={age}
                    />
                    <Text className="pl-2">years old</Text>
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
                          <Text className="text-xl">Male</Text>
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
                          <Text className="text-xl">Female</Text>
                        </TouchableOpacity>
                      </View>
                      {touched.gender && errors.gender && (
                        <Text className="text-red-400">{errors.gender}</Text>
                      )}
                    </View>
                  </View>

                  <Text className="text-gray-700 ml-4">Password</Text>
                  <View>
                    <PaperTextInput
                      className={` bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                      secureTextEntry={!showPassword}
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={() => setFieldTouched("password")}
                    />
                    {touched.password && errors.password && (
                      <Text className="text-red-400">
                        {errors.password && <Text>{errors.password}</Text>}
                      </Text>
                    )}

                    <PaperTextInput
                      className={` bg-gray-300 text-gray-1000 rounded-2xl mt-2 border-2 border-transparent ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                      secureTextEntry={!showPassword}
                      placeholder="Confirm your password"
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={() => setFieldTouched("confirmPassword")}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text className="text-red-400">
                        {errors.confirmPassword && (
                          <Text>{errors.confirmPassword}</Text>
                        )}
                      </Text>
                    )}
                  </View>

                  <View className="flex flex-row items-center mb-4">
                    <Checkbox
                      value={showPassword}
                      onValueChange={setShowPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text> Show password</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    disabled={!isValid}
                    className="py-3 bg-yellow-400 rounded-xl"
                    style={{
                      backgroundColor: isValid ? themeColors.bg2 : "lightgray",
                    }}
                    onPress={handleSubmit}
                  >
                    <Text className="text-2xl font-bold text-center  text-white">
                      Create account
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-7">
                  <Text className="text-gray-500 font-semibold">
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      className="font-semibold text-500"
                      style={{ color: themeColors.bg2 }}
                    >
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
