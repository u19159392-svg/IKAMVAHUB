import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { updateProfileDetails, getUserProfile } from "./db/Database";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user: any = await getUserProfile(1);
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  };

  const saveProfile = async () => {
    await updateProfileDetails(1, name, email);
    alert("Profile updated!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:"#fff" },
  title: { fontSize:22, fontWeight:"bold", marginBottom:20 },
  input: {
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:12,
    marginBottom:15,
  },
  button: {
    backgroundColor:"#14B8A6",
    padding:15,
    borderRadius:10,
    alignItems:"center",
  },
  buttonText: { color:"#fff", fontWeight:"bold" },
});