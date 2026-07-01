import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getNotificationsByUser, markNotificationAsRead } from './db/Database';

const CURRENT_USER_ID = 1;

type NotificationItem = {
  id: number;
  user_id: number;
  title: string;
  message: string;
  read: number;
  created_at: string;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const result = await getNotificationsByUser(CURRENT_USER_ID) as NotificationItem[] | null;
      setNotifications(result || []);
      setLoading(false);
    }
    loadNotifications();
  }, []);

  async function handlePress(item: NotificationItem) {
    if (item.read === 1) return;

    const success = await markNotificationAsRead(item.id);

    if (success) {
      setNotifications((previousList) =>
        previousList.map((n) =>
          n.id === item.id ? { ...n, read: 1 } : n
        )
      );
    }
  }

  function renderItem({ item }: { item: NotificationItem }) {
    const isUnread = item.read === 0;

    return (
      <TouchableOpacity
        style={[styles.card, isUnread && styles.unreadCard]}
        onPress={() => handlePress(item)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {isUnread && <View style={styles.dot} />}
        </View>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    );
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
      <Text style={styles.heading}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet.</Text>
        }
      />
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
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
  unreadCard: {
    backgroundColor: '#eaf2ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  message: {
    marginTop: 4,
    color: '#444',
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
  },
});