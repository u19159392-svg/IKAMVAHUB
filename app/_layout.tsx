import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { initDatabase, seedSchools } from './db/Database';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function RootLayout() {
  const { isDark } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#000',
          contentStyle: {
            backgroundColor: isDark ? '#000' : '#fff',
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
      await initDatabase();
      await seedSchools();
      setDbReady(true);
    };
    setup();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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