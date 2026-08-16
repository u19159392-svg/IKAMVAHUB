import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import OfflineBanner from "./OfflineBanner";
import SplashScreen from "./splash";

export default function Index() {
  return <SplashScreen />;
}

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary: always show UserSetup while developing
    setLoading(false);
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

        return(
          <>
          <OfflineBanner/>
          <View>
            {/* Your existing UI */}
          </View>
          </>
        );
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Redirect href="/UserSetup" />;
}
