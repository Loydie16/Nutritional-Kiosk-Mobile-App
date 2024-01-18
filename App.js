import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { useColorScheme } from "./theme/colorScheme";
import { getTheme } from "./utils/asyncStorageTheme";
import React, { useState, useEffect } from "react";

export default function App() {
  const { setColorScheme } = useColorScheme();

  const checkIfAlreadyDark = async () => {
    let darken = await getTheme("darken");
    if (darken === "1") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  };

  useEffect(() => {
    checkIfAlreadyDark();
  }, []);

  return <AppNavigation />;
}
