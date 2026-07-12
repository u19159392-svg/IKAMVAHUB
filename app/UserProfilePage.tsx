import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
}from "react-native";

// User Interface
interface User {
    id: number;
    username: string;
    email: string;
}

// Profile Interface
interface Profile {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    age: number;
    school: string;
    grade: string;
}

export default function UserProfilePage() {
    const [profile, setprofile] =
    useState<Profile> ({
        id: 1,
        userId: 1,
        firstName: " ",
        lastName: " ",
        age: 0,
        school: " ",
        grade: " "
    })

    const saveProfile = () => {
        console.log("Profile saved:", profile);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User 
                Profile</Text>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={(text) =>
                        setprofile({ ...profile, firstName: text })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={(text) =>
                        setprofile({ ...profile, lastName: text })
                    }
                />


                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        setprofile({ ...profile, age: parseInt(text) || 0 })
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder="School"
                    onChangeText={(text) =>
                        setprofile({ ...profile, school: text })
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder="Grade"
                    onChangeText={(text) =>
                        setprofile({ ...profile, grade: text })
                    }
                />

                <Button title="Save Profile"
                 onPress={saveProfile} />
                    </View>
    );
}

            const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    padding: 20,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                },
                title: {
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#00B8B8",
                    marginBottom: 20,
                    textAlign: "center",
                },
                input: {
                    borderWidth: 1,
                    borderColor: "#00B8B8",
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 15,
                },
            });

 