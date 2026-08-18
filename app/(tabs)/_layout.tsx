import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TEAL = "#14B8A6";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TEAL,
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
<Tabs.Screen
  name="tasks"
  options={{
    title: "Tasks",
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="checkmark-circle-outline"
        size={size}
        color={color}
      />
    ),
  }}
/>
    

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />

    <Tabs.Screen
  name="profile"
  options={{
    title: "Profile",
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="person-outline"
        size={size}
        color={color}
      />
    ),
  }}
/>
    </Tabs>
  );
}