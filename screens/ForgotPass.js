import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Lottie from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput as PaperTextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth  } from "../config/firebase";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

export default function ForgotPass() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email.").required("Required"),
  });

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: `Invalid Email Address 🥺`,
      text2: `Please try again!`,
    });
  };

  const handleSubmit = async (values) => {
    if (values.email) {
      try {
        setLoading(true);
        sendPasswordResetEmail(auth, values.email)
          .then(() => {
            setModalVisible(true);
          })
          .catch(() => {
            showErrorToast();
            // ..
          });
      } catch (err) {
        //console.log(err);
      } finally {
        // Reset loading state after authentication request completes (success or error)
        setLoading(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
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
        handleSubmit,
      }) => (
        <>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle={"light-content"}
          />

          <SafeAreaView
            className="flex-1 justify-center "
            style={{ backgroundColor: "#08bc8f" }}
          >
            <View className=" mx-4  bg-slate-100 rounded-3xl">
              <View className="py-28">
                <Lottie
                  source={require("../assets/animations/ForgotPassAnim.json")}
                  className=""
                  autoPlay
                  loop
                />
              </View>
              <View className="justify-center items-center px-4 space-y-2">
                <Text className="text-xl font-bold text-center">
                  Forgot your Password?
                </Text>
                <Text className="text-sm text-center text-gray-500 tracking-wide leading-2">
                  Don't worry, we will help you recover your Password!
                </Text>
              </View>

              <View className="space-y-2 mx-4 mt-10">
                <Text className="text-gray-700 ml-4">Email Address</Text>
                <PaperTextInput
                  className={`bg-gray-300 text-gray-1000 rounded-2xl border-2 border-transparent ${
                    touched.email && errors.email
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

              <View className="flex flex-row justify-between my-12 ">
                <TouchableOpacity
                  className="items-center justify-center ml-4"
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text className=" font-semibold text-blue-500">
                    <Icon name="arrow-left" size={15} /> Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="mr-4 p-4 bg-green-300 rounded-xl"
                  onPress={handleSubmit}
                >
                  {loading ? (
                    // If loading is true, show the activity indicator
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text className=" font-semibold">
                      Send <Icon name="send" size={15} />
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <Modal
              isVisible={isModalVisible}
              animationIn={"fadeInUp"}
              animationInTiming={500}
            >
              <View className="items-center justify-center bg-white border-4 border-green-500 rounded-2xl p-6">
                <Text className="text-l self-center justify-center tracking-wide leading-2 text-center">
                  Reset Password Link has been sent to your email. Check it now!
                </Text>
                <Text className="text-m self-center justify-center tracking-wide leading-2 text-center pt-4">
                  Check your spam if you can't find it!
                </Text>
                <View className="flex-row justify-evenly mt-10 w-full h-10 ">
                  <TouchableOpacity
                    className="bg-green-400 rounded-xl  items-center justify-center px-3 "
                    title="Hide modal"
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text className="self-center justify-center tracking-wide leading-2 text-center">
                      <Icon name="arrow-left" size={15} /> Back to login Page
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        </>
      )}
    </Formik>
  );
}
