import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, View } from 'react-native';
import { getSettings, updateSettings } from './db/Database';

const CURRENT_USER_ID = 1;

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getSettings(CURRENT_USER_ID);
      if (settings) {
        setNotificationsEnabled(settings.notifications_enabled === 1);
        setDarkMode(settings.dark_mode === 1);
      }
      setLoading(false);
    }
    loadSettings();
  }, []);

  async function handleToggleNotifications(newValue: boolean) {
    setNotificationsEnabled(newValue);
    await updateSettings(CURRENT_USER_ID, {
      notifications_enabled: newValue ? 1 : 0,
      dark_mode: darkMode ? 1 : 0,
    });
  }

  async function handleToggleDarkMode(newValue: boolean) {
    setDarkMode(newValue);
    await updateSettings(CURRENT_USER_ID, {
      notifications_enabled: notificationsEnabled ? 1 : 0,
      dark_mode: newValue ? 1 : 0,
    });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={handleToggleDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
  },
});