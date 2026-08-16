import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "./splash";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <Redirect href="/UserSetup" />;
}