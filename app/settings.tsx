import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { getSettings, updateSettings } from './db/Database';
import { useTheme } from './theme/ThemeContext';

export default function Settings() {
  const router = useRouter();
  const { isDark, toggleDarkMode } = useTheme();
  const [userId] = useState(1); // Replace with actual user ID later
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Load notification setting from database
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await getSettings(userId);
    if (settings) {
      setNotificationsEnabled(settings.notifications_enabled === 1);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await updateSettings(userId, { 
      notifications_enabled: value ? 1 : 0, 
      dark_mode: isDark ? 1 : 0 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>Settings</Text>

      {/* Notification Toggle */}
      <View style={[styles.settingItem, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.settingLabel, { color: isDark ? '#fff' : '#333' }]}>🔔 Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Dark Mode Toggle */}
      <View style={[styles.settingItem, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.settingLabel, { color: isDark ? '#fff' : '#333' }]}>🌙 Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleDarkMode} />
      </View>

      {/* View Notifications Button */}
      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/notifications')}>
        <Text style={[styles.linkText, { color: '#007AFF' }]}>View Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  settingLabel: { fontSize: 16 },
  linkButton: { marginTop: 15, alignItems: 'center' },
  linkText: { fontSize: 16 },
});