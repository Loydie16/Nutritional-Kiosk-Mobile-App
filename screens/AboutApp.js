import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AboutApp() {
  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1">
      <View className="px-6 pt-6">
        <Text className="text-justify tracking-wide leading-5">
          Welcome to [Your Mobile Application Name]! Here's everything you need
          to know about our app
        </Text>
      </View>

      <View className="px-6 ">
        <Text className="font-bold text-xl">Overview</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          [Your Mobile Application Name] is a user-friendly platform designed to
          provide seamless access to your nutritional kiosk results, BMI
          calculations, and convenient QR code login functionality. Our mission
          is to empower users to take control of their health and wellness
          journey by offering personalized insights and easy-to-use tools.
        </Text>
      </View>

      <View className="px-6 pt-6">
        <Text className="font-bold text-xl">Key Features</Text>

        <Text className="text-justify tracking-wide leading-5 mt-4 font-bold">
          • Previous Results Viewing{" "}
        </Text>
        <Text className="text-justify tracking-wide leading-5 font-normal pl-2 pt-2">
          Easily access and review your previous nutritional kiosk results
          directly from the mobile app. Track your progress and stay informed
          about your health journey.
        </Text>

        <Text className="text-justify tracking-wide leading-5 mt-4 font-bold">
          • BMI Calculator{" "}
        </Text>
        <Text className="text-justify tracking-wide leading-5 font-normal pl-2 pt-2">
          Utilize the built-in BMI calculator to determine your Body Mass Index
          (BMI) quickly and accurately. Monitor your weight and assess your
          health status with ease.
        </Text>

        <Text className="text-justify tracking-wide leading-5 mt-4 font-bold">
          • QR Code Scanner for Kiosk Login{" "}
        </Text>
        <Text className="text-justify tracking-wide leading-5 font-normal pl-2 pt-2">
          Seamlessly log in to the nutritional kiosk application by scanning QR
          codes using your mobile device. Enjoy a convenient and secure login
          process without the need for manual entry.
        </Text>

        <Text className="text-justify tracking-wide leading-5 mt-4 font-bold">
          • Profile Management{" "}
        </Text>
        <Text className="text-justify tracking-wide leading-5 font-normal pl-2 pt-2">
          Update and manage your user profile directly within the mobile app.
          Keep your personal information up to date and customize your
          experience to suit your preferences.
        </Text>

        <Text className="text-justify tracking-wide leading-5 mt-4 font-bold">
          • Dark Mode and Light Mode{" "}
        </Text>
        <Text className="text-justify tracking-wide leading-5 font-normal pl-2 pt-2">
          Switch between dark mode and light mode effortlessly to customize the
          app's appearance based on your preferences and lighting conditions.
          Enjoy optimal visibility and reduce eye strain in any environment.
        </Text>
      </View>

      <View className="flex flex-1 px-6  ">
        <Text className="font-bold text-xl">Developer Team</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          [Your Mobile Application Name] was crafted by a committed group of
          individuals, driven by the aspiration to deliver a superior user
          experience. Get to know our team:
        </Text>

        <View className="justify-center items-center mt-10">
          <Image
            source={require("../assets/images/10002.jpg")}
            className=" w-40 h-40"
            // Adjust width and height as needed
          />
          <Text className="text-center font-bold  mt-2">
            Jon Loyd T. Talagtag
          </Text>
          <Text className="text-center italic mb-10">
            Lead Developer/Programmer
          </Text>

          <Image
            source={require("../assets/images/monteroyo.jpg")}
            className=" w-40 h-40"
            // Adjust width and height as needed
          />
          <Text className="text-center font-bold  mt-2">
            Joseph Lester D. Monteroyo
          </Text>
          <Text className="text-center italic mb-10">Member</Text>

          <Image
            source={require("../assets/images/ortega.jpg")}
            className=" w-40 h-40"
            // Adjust width and height as needed
          />
          <Text className="text-center font-bold mt-2">
            Marck Joebert P. Ortega
          </Text>
          <Text className="text-center italic mb-10">Member</Text>
        </View>
      </View>

      <View className="px-6 ">
        <Text className="font-bold text-xl">Acknowledgement</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          We extend our heartfelt gratitude to all our users for their
          continuous support and feedback. [Your Mobile Application Name]
          wouldn't be where it is today without you. Special thanks to our
          dedicated team members and contributors who have worked tirelessly to
          make this app a reality.
        </Text>
      </View>

      <View className="px-6 ">
        <Text className="font-bold text-xl">Terms and Conditions</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          By using [Your Mobile Application Name], you agree to abide by the
          following terms and conditions:
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • You agree not to misuse the app or engage in any illegal activities.
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • We reserve the right to terminate or suspend your account if you
          violate any of these terms.
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • For the full terms and conditions, please visit{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              navigation.navigate("TermsAgreements", {
                screen: "TermsAgreements",
              })
            }
          >
            terms and conditions.
          </Text>
        </Text>
      </View>

      <View className="px-6 mt-10">
        <Text className="font-bold text-xl">Help and Support</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          Need assistance? Our support team is ready to assist you with any
          questions or concerns you may have. Here's how you can get help:
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • Check out our FAQ section for answers to common questions.
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • If you can't find what you're looking for, reach out to us directly
          at{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("mailto:talagtag.jonloyd.t.165@cdm.edu.ph")
            }
          >
            talagtag.jonloyd.t.165@cdm.edu.ph
          </Text>{" "}
          or our{" "}
          <Text
            className="text-justify tracking-wide leading-5 "
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://forms.gle/9uNQB7j2zSH2mfFL8")
            }
          >
            Support/Report a Problem Form.
          </Text>
        </Text>
      </View>

      <View className="px-6 mt-10">
        <Text className="font-bold text-xl">Feedback</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          Your feedback is invaluable to us as we strive to improve [Your Mobile Application
          Name] continuously. Whether you have suggestions for new features,
          encounter a bug, or just want to share your thoughts, we'd love to
          hear from you. Please don't hesitate to send us your feedback via
          email at{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("mailto:talagtag.jonloyd.t.165@cdm.edu.ph")
            }
          >
            talagtag.jonloyd.t.165@cdm.edu.ph
          </Text>{""}
          .
        </Text>
      </View>
    </ScrollView>
  );
}
