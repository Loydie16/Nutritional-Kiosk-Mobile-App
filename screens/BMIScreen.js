import React, { useEffect, useRef, useState } from 'react';
import { View, Text, BackHandler, ActivityIndicator, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from "../theme/colorScheme";

export default function BMIScreen({ navigation }) {
  const { colorScheme } = useColorScheme();
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const renderLoadingIndicator = () => (
    <View className="h-full dark:bg-black items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  const handleBackPress = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
      return true; // Prevent default back button behavior
    }
    return false; // Allow default back button behavior
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove(); // Remove the event listener when the component unmounts
  }, [canGoBack]);

  return (
    <>
      
      <SafeAreaView className="flex-1 dark:bg-black">
        <WebView
          ref={webViewRef}
          source={{ uri: "https://www.calculator.net/bmi-calculator.html" }}
          renderLoading={renderLoadingIndicator}
          startInLoadingState
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
        />
      </SafeAreaView>
    </>
  );
}
