import { Image } from 'expo-image'git add
import { useRouter } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import SetupScreen from '../UserSetupPage';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return <SetupScreen />;
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>

      {/* DEBUG BUTTON */}
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => router.push('/debug')}
        >
          <ThemedText style={styles.debugButtonText}>Debug Database</ThemedText>
        </TouchableOpacity>
        <ThemedText>
          Tap here to test the database (add, view, update, delete users)
        </ThemedText>
      </ThemedView>
      {/* SETTINGS & NOTIFICATIONS BUTTONS */}
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => router.push('/settings')}
        >
          <ThemedText style={styles.debugButtonText}>Settings</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => router.push('/notifications')}
        >
          <ThemedText style={styles.debugButtonText}>Notifications</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  debugButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Import your screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// Main Tab Navigator for authenticated users
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Tasks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
import 'package:flutter/material.dart';
import { getInternalInstanceHandleFromPublicInstance } from 'react-native/types_generated/Libraries/ReactPrivate/ReactNativePrivateInterface';
import { startHeadlessTask } from 'react-native/types_generated/Libraries/ReactNative/AppRegistryImpl';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Task App',
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: new Text("Home"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => new LoginScreen()),
                );
              },
              child: new Text("Login"),
            ),

            SizedBox(height: 10),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => new SignupScreen()),
                );
              },
              child: new Text("Sign Up"),
            ),

            SizedBox(height: 10),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => new ProfileScreen()),
                );
              },
              child: new Text("Profile"),
            ),

            SizedBox(height: 10),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => new EditProfileScreen()),
                );
              },
              child: new Text("Edit Profile"),
            ),

            SizedBox(height: 10),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => new TasksScreen()),
                );
              },
              child: new Text("Tasks"),
            ),
          ],
        ),
      ),
    );
  }
}

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: new Text("Login")),
      body: Center(child: new Text("Login Screen")),
    );
  }
}

class SignupScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: new Text("Sign Up")),
      body: Center(child: new Text("Signup Screen")),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: new Text("Profile")),
      body: Center(child: new Text("Profile Screen")),
    );
  }
}

class EditProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: new Text("Edit Profile")),
      body: Center(child: new Text("Edit Profile Screen")),
    );
  }
}

class TasksScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: new Text("Tasks")),
      body: Center(child: new Text("Tasks Screen")),
    );
  }

function main() {
    throw new Error('Function not implemented.');
  }


function runApp(arg0: any) {
    throw new Error('Function not implemented.');
  }


function override(target: undefined, context: ClassFieldDecoratorContext<MyApp, any> & { name: 'Widget'; private: false; static: false; }): void | ((this: MyApp, value: any) => any) {
    throw new Error('Function not implemented.');
  }


function MaterialApp(debugShowCheckedModeBanner: any, arg1: boolean, title: any, arg3: string, home: any, arg5: React.JSX.Element) {
    throw new Error('Function not implemented.');
  }


function Scaffold(appBar: any, arg1: any, body: any, arg3: any) {
    throw new Error('Function not implemented.');
  }


function AppBar(title: any, arg1: any): any {
    throw new Error('Function not implemented.');
  }


function Padding(padding: any): any {
    throw new Error('Function not implemented.');
  }


function Column(crossAxisAlignment: any, stretch: any, children: any, arg3: any[]) {
    throw new Error('Function not implemented.');
  }


function ElevatedButton(onPressed: any, arg1: () => void, child: any, arg3: any): any {
    throw new Error('Function not implemented.');
  }


function MaterialPageRoute(builder: any, arg1: (_: any) => any): any {
    throw new Error('Function not implemented.');
  }


function SizedBox(height: any, arg1: number): any {
    throw new Error('Function not implemented.');
  }


function Center(child: any, arg1: any): any {
    throw new Error('Function not implemented.');
  }
