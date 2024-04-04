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
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ";

const CONTENT = [
  {
    title: "First",
    content: BACON_IPSUM,
  },
  {
    title: "Second",
    content: BACON_IPSUM,
  },
  {
    title: "Third",
    content: BACON_IPSUM,
  },
  {
    title: "Fourth",
    content: BACON_IPSUM,
  },
  {
    title: "Fifth",
    content: BACON_IPSUM,
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
          <View className="px-6 flex-row items-center justify-between h-16">
            <Text>{section.title}</Text>
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
          <Text
            className="text-justify tracking-wide leading-5 mt-4"
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://forms.gle/9uNQB7j2zSH2mfFL8")
            }
          >
            • Support/Report a Problem Form
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
            reserved. You may access this from [Your Mobile Application Name]
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
              terms and agreements
            </Text>
          </Text>
        </View>

        <View className="px-6 pt-10">
          <Text className="font-bold text-xl">Stay Connected</Text>
          <Text className="text-justify tracking-wide leading-5 mt-4">
            Follow us on social media to stay up-to-date with the latest news,
            updates, and announcements from [Your Mobile Application Name]. We
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
          Thank you for using [Your Mobile Application Name]. We appreciate your
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
