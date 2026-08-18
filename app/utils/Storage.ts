import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};

/**
 * Clears the persisted login session so the next app launch
 * lands on the login screen instead of going straight to home.
 * Does NOT clear `hasAccount`, so UserSetup is never shown again.
 */
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userLoggedIn");
    (global as any).userLoggedIn = false;
    (global as any).currentUserId = null;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};






