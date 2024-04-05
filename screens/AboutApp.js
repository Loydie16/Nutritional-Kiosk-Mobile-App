import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function AboutApp() {
  return (
    <ScrollView className="flex-1">
      <View className="px-6 pt-6">
        <Text className="text-justify tracking-wide leading-5">
          Welcome to [Your Mobile Application Name]! Here's everything you need
          to know about our app:
        </Text>
      </View>
    </ScrollView>
  );
}
