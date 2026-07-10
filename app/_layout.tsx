import { Stack } from 'expo-router';
import { View } from 'react-native';
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
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}