import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../utils/asyncStorage";
import { TextInput as PaperTextInput } from "react-native-paper";
import Lottie from "lottie-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(2);
  const [loginDisabledUntil, setLoginDisabledUntil] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showText, setShowText] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const showToast = (values) => {
    Toast.show({
      type: "success",
      text1: `Hello ${values.email} 👋`,
      text2: "Successfully logged in!",
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: `Invalid Credentials. 🥺`,
      text2: `You have only ${loginAttempts} attempts remaining.`,
    });
  };

  const showVerifyToast = () => {
    Toast.show({
      type: "error",
      text1: `Email address not verified. 🥺`,
      text2: `Check your email for a verification link.`,
      visibilityTime: 7000,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("Onboarding");
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .test("is-complete-email", "Email must be complete", function (value) {
        // Use a regex pattern to check for a complete email address
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      }),

    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    if (values.email && values.password) {
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        // Check if the user's email is verified
        if (userCredential.user && userCredential.user.emailVerified) {
          showToast(values); // Proceed with login
        } else {
          // Email not verified, prompt the user to verify
          // You can handle this case based on your UI/UX design
          auth.signOut();
          showVerifyToast();
        }
      } catch (err) {
        console.log(err);
        showErrorToast();
        setLoginError(true);
        setLoginAttempts(loginAttempts - 1);
        if (loginAttempts === 0) {
          const disabledUntil = Date.now() + 1 * 30 * 1000;
          setLoginDisabledUntil(disabledUntil);
          setShowText(true);
          setDisabled(true);
          // Store the disabledUntil timestamp in AsyncStorage
          await AsyncStorage.setItem(
            "loginDisabledUntil",
            disabledUntil.toString()
          );
          setLoginAttempts(2);
        }
      } finally {
        // Reset loading state after authentication request completes (success or error)
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadRemainingTime = async () => {
      const storedDisabledUntil = await AsyncStorage.getItem(
        "loginDisabledUntil"
      );

      if (storedDisabledUntil) {
        const disabledUntilTimestamp = parseInt(storedDisabledUntil, 10);

        if (disabledUntilTimestamp > Date.now()) {
          const timeDifference = disabledUntilTimestamp - Date.now();
          setLoginDisabledUntil(disabledUntilTimestamp);
          setShowText(true);
          setDisabled(true);

          // Calculate remaining minutes and seconds
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);

          // Set the remaining time in the state
          setRemainingTime(`${minutes}m ${seconds}s`);
        }
      }
    };

    loadRemainingTime();

    const intervalId = setInterval(() => {
      if (loginDisabledUntil) {
        const currentTime = Date.now();
        const timeDifference = loginDisabledUntil - currentTime;

        if (timeDifference > 0) {
          // Calculate remaining minutes and seconds
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);

          // Set the remaining time in the state
          setRemainingTime(`${minutes}m ${seconds}s`);
        } else {
          // Clear the interval if the remaining time is less than or equal to 0
          clearInterval(intervalId);
          setLoginDisabledUntil(null);
          setShowText(false);
          setDisabled(false);
          setLoginError(false);
        }
      }
    }, 1000); // Update every second

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [loginDisabledUntil]);

  return (
    <ScrollView>
      <View className="flex-1 " style={{ backgroundColor: themeColors.bg1 }}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleSubmit(values); // Call your custom function with form values
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle={"dark-content"}
              />
              <SafeAreaView className="flex items-center ">
                <View className="flex-row justify-center w-96 h-96 ">
                  <Lottie
                    source={require("../assets/onboarding-animation/animation_lmoz5alw.json")}
                    autoPlay
                    loop
                  />
                </View>
              </SafeAreaView>
              <View
                style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
                className="flex-1 bg-white px-8  "
              >
                <View className="flex pt-8  ">
                  <View className="form space-y-2 ">
                    <View className="flex justify-center items-center ">
                      <Text className="text-4xl font-bold text-gray-500">
                        Login
                      </Text>
                    </View>
                    {showText && (
                      <View className="flex justify-center items-center bg-red-400 p-3 rounded-2xl">
                        <Text className="text-white text-center tracking-wide leading-5">
                          Logging In is currently disabled. Please try again in{" "}
                          {remainingTime}
                        </Text>
                      </View>
                    )}

                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <View>
                      <PaperTextInput
                        className={`bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                          (touched.email && errors.email) || loginError
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                        disabled={loading || disabled}
                        placeholder="Enter your email"
                        cursorColor="black"
                        selectionColor="black"
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email")}
                        right={<PaperTextInput.Icon icon="email" />}
                      />

                      {touched.email && errors.email && (
                        <Text className="text-red-400 ">{errors.email}</Text>
                      )}
                    </View>

                    <Text className="text-gray-700 ml-4">Password</Text>
                    <View>
                      <PaperTextInput
                        className={` bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                          (touched.password && errors.password) || loginError
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                        secureTextEntry={!passwordVisible}
                        right={
                          <PaperTextInput.Icon
                            icon={passwordVisible ? "eye-off" : "eye"}
                            onPress={togglePasswordVisibility}
                          />
                        }
                        disabled={loading || disabled}
                        cursorColor="black"
                        selectionColor="black"
                        activeUnderlineColor="transparent"
                        underlineColor="transparent"
                        placeholder="Enter your password"
                        inlineImageLeft="search_icon"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                      />

                      {touched.password && errors.password && (
                        <Text className="text-red-400 ">{errors.password}</Text>
                      )}
                    </View>

                    <View className="flex items-end ">
                      <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPass")}
                      >
                        <Text className="text-gray-700 mb-5">
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      disabled={loading || disabled} // Disable the button when loading is true
                      className="py-3 bg-300 rounded-xl "
                      style={{
                        backgroundColor: disabled ? "#ababab" : themeColors.bg1,
                      }}
                      onPress={handleSubmit}
                    >
                      {loading ? (
                        // If loading is true, show the activity indicator
                        <ActivityIndicator size="large" color="#ffffff" />
                      ) : (
                        // If loading is false, show the login button
                        <Text className="text-3xl font-bold text-center text-700 text-white">
                          Login
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View className="row justify-center mt-12  items-center ">
                    <Text className="text-gray-500 font-semibold text-xl ">
                      Don't have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <Text
                        className="font-semibold text-500 text-xl"
                        style={{ color: themeColors.bg1 }}
                      >
                        {" "}
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold text-m">
                      Read our
                    </Text>
                    <TouchableOpacity>
                      <Text
                        className="font-semibold text-blue-500 text-m"
                        onPress={handleReset}
                      >
                        {" "}
                        Terms and Agreements
                      </Text>
                    </TouchableOpacity>                         
                  </View>
                  <View className="m-3"></View>
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
