import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import Constants from "expo-constants";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";


const CONTENT = [
  {
    title: "How can I access my previous results?",
    content:
      "You can access your previous results by navigating to the 'Results' section in the app. Here, you'll find a detailed history of your nutritional kiosk interactions.",
  },
  {
    title: "Can I calculate my BMI using the app?",
    content:
      "Yes, you can easily calculate your BMI (Body Mass Index) using the built-in BMI calculator feature. Simply input your height and weight, and the app will provide you with your BMI value.",
  },
  {
    title:
      "How do I log in to the kiosk application using the QR Code scanner?",
    content:
      "To log in to the kiosk application, simply open the QR Code scanner feature in the mobile app and scan the QR Code displayed on the kiosk. This will automatically log you in and sync your profile.",
  },
  {
    title: "Is it possible to update my profile through the mobile app?",
    content:
      "Yes, you can update your profile information directly from the app. Navigate to the 'Profile' section, where you'll find options to edit and update your personal details, including height, weight, and dietary preferences.",
  },
  {
    title: "Does the mobile app offer a dark mode feature?",
    content:
      "Yes, our mobile app supports both dark mode and light mode options. You can toggle between these modes by accessing the settings menu within the app and selecting your preferred theme.",
  },
];

const App = () => {
  const navigation = useNavigation();

  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, index, isActive) => {
    return (
      <View>
        {index === 0 && ( // Check if it's the first section
          <View className="border-t-2 border-gray-300"></View>
        )}
        <View className="border-b-2 border-gray-300">
          <View className="px-4 flex-row items-center justify-between h-24">
            <Text className="w-80">
              {section.title}
            </Text>
            <Icon name={isActive ? "chevron-up" : "chevron-down"} size={20} />
          </View>
        </View>
      </View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  return (
    <View className="flex flex-1  ">
      <ScrollView className="flex flex-1 pt-6">
        <Text className="text-justify tracking-wide leading-5 px-6">
          Welcome to the Help and Support page for [Your Mobile Application
          Name]. We are dedicated to providing you with the assistance you need
          to make the most out of our application. Below are some resources to
          help you get started and troubleshoot any issues you may encounter.
        </Text>

        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setSections}
        />

        <View className="px-6 pt-10">
          <Text className="font-bold text-xl">Contact Us</Text>
          <Text className="text-justify tracking-wide leading-5 mt-4">
            If you have any questions, concerns, or feedback about [Your Mobile
            Application Name], our team is here to help! You can contact us via
            email or through our support form. Please allow up to [X hours/days]
            for a response.
          </Text>
          <Text className="text-justify tracking-wide leading-5 mt-4">
            • Email:{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() =>
                Linking.openURL("mailto:talagtag.jonloyd.t.165@cdm.edu.ph")
              }
            >
              talagtag.jonloyd.t.165@cdm.edu.ph
            </Text>
          </Text>
        </View>

        <View className="px-6 pt-10">
          <Text className="font-bold text-xl">Report a Problem </Text>
          <Text className="text-justify tracking-wide leading-5 mt-4">
            Encountering a technical issue or bug? Please let us know by
            reporting the problem directly through our support form. Our team
            will investigate the issue and work to resolve it as quickly as
            possible.
          </Text>
          <Text className="mt-4">
            •{" "}
            <Text
              className="text-justify tracking-wide leading-5 "
              style={{ color: "blue" }}
              onPress={() =>
                Linking.openURL("https://forms.gle/9uNQB7j2zSH2mfFL8")
              }
            >
              Support/Report a Problem Form
            </Text>
          </Text>
        </View>

        <View className="px-6 pt-10">
          <Text className="font-bold text-xl">
            Privacy Policy and Terms of Service
          </Text>
          <Text className="text-justify tracking-wide leading-5 mt-4">
            Unless otherwise stated, [Your Company Name] and/or its licensors
            own the intellectual property rights for all material on [Your
            Mobile Application Name]. All intellectual property rights are
            reserved. You may access this from NutriKiosk Mobile App
            for your own personal use subjected to restrictions set in these{" "}
            {""}
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

        <View className="px-6 pt-10">
          <Text className="font-bold text-xl">Stay Connected</Text>
          <Text className="text-justify tracking-wide leading-5 mt-4">
            Follow us on social media to stay up-to-date with the latest news,
            updates, and announcements from NutriKiosk Mobile App. We
            also encourage you to join our community forums to connect with
            other users and share your experiences.
          </Text>
          <View className="flex flex-row gap-10 items-center justify-center py-6">
            <TouchableOpacity>
              <Icon name="facebook" size={30} color={"#1877F2"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="twitter" size={30} color={"#1DA1F2"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="instagram" size={30} color={"#1877F2"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="linkedin" size={30} color={"#0762C8"} />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-justify tracking-wide leading-5 px-6 my-10">
          Thank you for using NutriKiosk Mobile App. We appreciate your
          support and are committed to providing you with an exceptional user
          experience. If there's anything else we can assist you with, please
          don't hesitate to reach out.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 40,
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default App;
