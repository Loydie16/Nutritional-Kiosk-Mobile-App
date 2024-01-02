import { View, Text, BackHandler } from 'react-native'
import React, { useRef } from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BMIScreen() {

  const webViewRef = useRef(null);

  // Event handler for back button press
  const handleBackButton = () => {
    if (webViewRef.current) {
      // Check if WebView can go back
      webViewRef.current.goBack();
      return true; // Prevent default behavior
    }
    return false; // Allow def  ault behavior (exit the app if not in WebView)
  };

  // Add event listener for Android back button
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      // Remove event listener when component unmounts
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    
    <SafeAreaView className="flex-1 ">
      <WebView 
        
        ref={webViewRef}
        source={{ uri: 'https://www.calculator.net/bmi-calculator.html' }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    </SafeAreaView>
  
  ) 
}