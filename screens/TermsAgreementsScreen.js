import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function TermsAgreementsScreen() {
  return (
    <ScrollView className="flex-1">
      <View className="px-6 pt-6">
        <Text className="text-justify tracking-wide leading-5">
          Welcome to NutriKiosk Mobile App! These terms and conditions
          outline the rules and regulations for the use of our mobile
          application.
        </Text>

        <Text className="text-justify tracking-wide leading-5">
          By accessing this mobile application, we assume you accept these terms
          and conditions. Do not continue to use NutriKiosk Mobile App
          if you do not agree to take all of the terms and conditions stated on
          this page.
        </Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="font-bold text-xl">License</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          Unless otherwise stated, [Your Company Name] and/or its licensors own
          the intellectual property rights for all material on [Your Mobile
          Application Name]. All intellectual property rights are reserved. You
          may access this from NutriKiosk Mobile App for your own
          personal use subjected to restrictions set in these terms and
          conditions.
        </Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="font-bold text-xl">Restrictions</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4 font-semibold">
          You are specifically restricted from all of the following:
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • Publishing any NutriKiosk Mobile App material in any other
          media.
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • Selling, sublicensing, and/or otherwise commercializing any [Your
          Mobile Application Name] material.
        </Text>
        <Text className="text-justify tracking-wide leading-5   ">
          • Using NutriKiosk Mobile App in any way that is or may be
          damaging to [Your Company Name].
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • Using NutriKiosk Mobile App in any way that impacts user
          access to NutriKiosk Mobile App.
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • Using NutriKiosk Mobile App contrary to applicable laws and
          regulations, or in any way may cause harm to the [Your Mobile
          Application Name], or to any person or business entity.
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          • Engaging in any data mining, data harvesting, data extracting, or
          any other similar activity in relation to [Your Mobile Application
          Name].
        </Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="font-bold text-xl">Your Content</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          In these terms and conditions, "Your Content" shall mean any audio,
          video text, images, or other material you choose to display on [Your
          Mobile Application Name]. By displaying Your Content, you grant [Your
          Company Name] a non-exclusive, worldwide, irrevocable, sub-licensable
          license to use, reproduce, adapt, publish, translate, and distribute
          it in any and all media.
        </Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="font-bold text-xl">Reservation of Rights</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          We reserve the right to request that you remove all links or any
          particular link to NutriKiosk Mobile App. You approve to
          immediately remove all links to NutriKiosk Mobile App upon
          request. We also reserve the right to amend these terms and conditions
          and it's linking policy at any time. By continuously linking to [Your
          Mobile Application Name], you agree to be bound to and follow these
          linking terms and conditions.
        </Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="font-bold text-xl">Governing Law & Jurisdiction</Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          These terms will be governed by and interpreted in accordance with the
          laws of the jurisdiction of [Your Country], and you submit to the
          non-exclusive jurisdiction of the state and federal courts located in
          [Your Country] for the resolution of any disputes.
        </Text>
      </View>

      <View className="px-6 pt-10">
        <Text className="font-bold text-xl">
          Changes to These Terms and Conditions
        </Text>
        <Text className="text-justify tracking-wide leading-5 mt-4">
          We reserve the right, at our sole discretion, to modify or replace
          these terms at any time. By continuing to access or use our mobile
          application after those revisions become effective, you agree to be
          bound by the revised terms. If you do not agree to the new terms,
          please stop using NutriKiosk Mobile App.
        </Text>
      </View>
    </ScrollView>
  );
}
