import React, { useState, useEffect, forwardRef } from "react";
import { useColorScheme } from "./theme/colorScheme";
import { getTheme } from "./utils/asyncStorageTheme";
import Toast from "react-native-toast-message";
import AppNavigation from "./navigation/appNavigation";

const App = forwardRef((props, ref) => {
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

  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
});

export default App;
