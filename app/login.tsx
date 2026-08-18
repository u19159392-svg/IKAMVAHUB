import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const db = SQLite.openDatabaseSync("ikamvahub.db");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const result = await db.getAllAsync(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password]
      );

      if (result.length > 0) {
        // ✅ IMPORTANT: set login state to stop redirect loop
        (global as any).userLoggedIn = true;

        // ✅ go to app
        router.replace("/(tabs)/home");
      } else {
        alert("Invalid login details");
      }
    } catch (error) {
      console.log(error);
      alert("Login error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "#fff" }}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/UserSetup")}>
        <Text style={{ marginTop: 20 }}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#14B8A6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});