import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import SplashScreen from "./splash";
import { getData } from "./utils/Storage";

type AuthState = "loading" | "splash" | "setup" | "login" | "home";

export default function Index() {
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is already logged in (session persisted)
        const loggedIn = await getData("userLoggedIn");
        if (loggedIn) {
          setAuthState("home");
          return;
        }

        // Check if user has ever created an account
        const hasAccount = await getData("hasAccount");
        if (hasAccount) {
          // Account exists but not logged in → go straight to login
          setAuthState("login");
          return;
        }

        // First launch ever → show splash then setup
        setAuthState("splash");
      } catch {
        setAuthState("splash");
      }
    };

    checkAuth();
  }, []);

  if (authState === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0F8B8D" />
      </View>
    );
  }

  if (authState === "splash") {
    return <SplashWrapper onDone={() => setAuthState("setup")} />;
  }

  if (authState === "home") {
    return <Redirect href="/(tabs)/home" />;
  }

  if (authState === "login") {
    return <Redirect href="/login" />;
  }

  // authState === "setup"
  return <Redirect href="/UserSetup" />;
}

// Wrapper that plays the splash then calls onDone
function SplashWrapper({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <SplashScreen />;
}
