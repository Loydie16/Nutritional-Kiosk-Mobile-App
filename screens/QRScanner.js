import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Touchable, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "../theme/colorScheme";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { colorScheme } = useColorScheme();
  const [cameraType, setCameraType] = useState(BarCodeScanner.Constants.Type.back);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //setScanned(true);
     if (!scanned) {
       setScanned(true);
       alert(`Bar code with type ${type} and data ${data} has been scanned!`);
       setTimeout(() => {
         setScanned(false);
       }, 5000); // Adjust the delay time in milliseconds (e.g., 5000 for 5 seconds)
     }
  };

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  if (hasPermission === null) {
   return (
     <SafeAreaView className="flex-1 dark:bg-black">
       <View className="flex-1 justify-center items-center self-center  ">
         <Text className="text-center text-xl items-center p-4 dark:text-white">
           Requesting for camera permission...
         </Text>
         <ActivityIndicator
           size="large"
           color={colorScheme === "dark" ? "#fff" : "#000"}
         />
       </View>
     </SafeAreaView>
   );
  }
  
  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 dark:bg-black">
        <View className="flex-1 justify-center items-center self-center  ">
          <Text className="text-center text-xl items-center p-4 dark:text-white">No access to camera</Text>
          <TouchableOpacity
            className="p-4 m-4 bg-blue-500 self-center rounded-lg"
            onPress={requestCameraPermission}
          >
            <Text className="text-center items-center  text-white  ">
              Request Camera Access Permission
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center flex-col dark:bg-black ">
          <Text className="text-center text-xl items-center p-4 dark:text-white">
            Scan the QR Code on the Kiosk Login Page
          </Text>
          <View className="flex-1 bg-neutral-300 border-2 border-slate-400 dark:bg-[#232323] dark:border-2 dark:border-slate-400 mx-6 p-4 rounded-3xl ">
            <BarCodeScanner
              type={cameraType}
              onBarCodeScanned={handleBarCodeScanned}
              className="flex-1 justify-center self-center w-9/12 h-auto "
            />
          </View>
          <TouchableOpacity
            className="p-4 m-4 bg-blue-500 self-center rounded-lg"
            onPress={() => {
              setCameraType(
                cameraType === BarCodeScanner.Constants.Type.back
                  ? BarCodeScanner.Constants.Type.front
                  : BarCodeScanner.Constants.Type.back
              );
            }}
          >
            <Text className="text-center items-center  text-white  ">
              Flip Camera
            </Text>
          </TouchableOpacity>
          {/* {scanned && (
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        )} */}
        </View>
      </SafeAreaView>
    </>
  );
}










