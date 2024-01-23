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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../utils/asyncStorage";
import { TextInput as PaperTextInput } from "react-native-paper";
import Lottie from "lottie-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      text1: `Invalid Credentials 🥺`,
      text2: "Check your email and password.",
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
    email: Yup.string().email("Invalid email.").required("Required"),

    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    if (values.email && values.password) {
      try {
        // Set loading to true before making the authentication request
        setLoading(true);

        await signInWithEmailAndPassword(auth, values.email, values.password);
        showToast(values);
      } catch (err) {
        showErrorToast();
        setLoginError(true);
      } finally {
        // Reset loading state after authentication request completes (success or error)
        setLoading(false);
      }
    }
  };

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
              <StatusBar backgroundColor="transparent" translucent={true} />
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

                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <View>
                      <PaperTextInput
                        className={`bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                          (touched.email && errors.email) || loginError
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
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
                      <TouchableOpacity>
                        <Text className="text-gray-700 mb-5">
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      disabled={loading} // Disable the button when loading is true
                      className="py-3 bg-300 rounded-xl "
                      style={{ backgroundColor: themeColors.bg1 }}
                      onPress={handleSubmit}
                    >
                      {loading ? (
                        // If loading is true, show the activity indicator

                        <View className=" flex-row justify-center items-center">
                          <ActivityIndicator size="large" color="#ffffff" />
                        </View>
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
                        Terms{" "}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-gray-500 font-semibold text-m">
                      and
                    </Text>
                    <TouchableOpacity>
                      <Text className="font-semibold text-blue-500 text-m">
                        {" "}
                        Agreements
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
