import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const { isDark } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#fff",
      }}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
          },
          headerTintColor: isDark ? "#fff" : "#000",
          contentStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
          },
        }}
      />
    </View>
  );
}

export default function Layout() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const startTime = Date.now();

      try {
        const db = await import("./db/Database");

        if (db?.initDatabase) {
          await db.initDatabase();
        }

        const refDb = await import("./db/ReferenceDatabase");

        if (refDb?.initReferenceDatabase) {
          await refDb.initReferenceDatabase();
        }
      } catch (error) {
        console.error("Database initialization error:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsed, 0);

        await new Promise((resolve) =>
          setTimeout(resolve, remainingTime)
        );

        setDbReady(true);

        await SplashScreen.hideAsync();
      }
    };

    setup();
  }, []);

  if (!dbReady) {
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

  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}