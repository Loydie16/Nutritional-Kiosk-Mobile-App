import AsyncStorage from "@react-native-async-storage/async-storage";

export const setTheme = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing value: ", error);
  }
};

export const getTheme = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error retrieving value: ", error);
  }
};

export const removeTheme = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error deleting value: ", error);
  }
};
