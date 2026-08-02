import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [setupDone, setSetupDone] = useState(false);

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const value = await AsyncStorage.getItem("setupDone");

        console.log("🚦 INDEX setupDone:", value);

        setSetupDone(value === "true");
      } catch (error) {
        console.error("Setup check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSetup();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (setupDone) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/UserSetup" />;
}
