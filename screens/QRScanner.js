import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "../theme/colorScheme";
import { auth, database } from "../config/firebase";
import { getDatabase, ref, onValue, get, child, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const [cameraType, setCameraType] = useState(
    BarCodeScanner.Constants.Type.back
  );
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //setScanned(true);
    if (!scanned) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `sessions`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const sessions = snapshot.val();

            // Initialize variables to hold the most recent session data
            let mostRecentSessionId = null;
            let mostRecentCreatedAt = null;

            // Iterate through each session
            Object.keys(sessions).forEach((sessionId) => {
              const session = sessions[sessionId];
              const createdAt = new Date(session.created_at);

              // Check if the session is more recent than the current most recent session
              if (!mostRecentCreatedAt || createdAt > mostRecentCreatedAt) {
                mostRecentSessionId = sessionId;
                mostRecentCreatedAt = createdAt;
              }
            });

            if (mostRecentSessionId) {
              if (mostRecentSessionId == data) {
                set(
                  ref(database, `sessions/${mostRecentSessionId}/userID`),
                  auth.currentUser.uid
                );
                alert("You have successfully logged in on the kiosk!");
                //navigation.navigate("Home"); 
              } else {
                alert("Invalid QR Code");
              }
            } else {
              console.log("No session data available");
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setScanned(true);

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
      <>
        <StatusBar
          backgroundColor="transparent"
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
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
      </>
    );
  }

  if (hasPermission === false) {
    return (
      <>
        <StatusBar
          backgroundColor="transparent"
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <SafeAreaView className="flex-1 dark:bg-black">
          <View className="flex-1 justify-center items-center self-center  ">
            <Text className="text-center text-xl items-center p-4 dark:text-white">
              No access to camera
            </Text>
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
      </>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView className="flex-1 dark:bg-black">
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
