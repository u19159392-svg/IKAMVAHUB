import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";


import { useRouter } from 'expo-router';
export default function SetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [career, setCareer] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎓 IkamvaHub</Text>

        <Text style={styles.title}>Welcome! 👋</Text>
        <Text style={styles.subtitle}>
          Let's set up your profile
        </Text>
        <Text style={{fontSize: 20, color: "red",
          fontWeight: "bold" }}>
            Current step:{step}
          </Text>
        

        {[1, 2, 3, 4].map((item) => (
        <View 
        key={item}
        style={[
          styles.dot,
          item <= step && styles.activeDot,
        ]}
        />
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          {step ===1 && "Personal Information"}
          {step ===2 && "School Information"}
          {step ===3 && "Interests & Accessibility Information"}  
          {step ===4 && "Profile Setup Complete!"} 
        </Text>        
        <Text style={styles.subtitle}>step {step} of 4</Text>

        {/* STEP 1 */}
        {step === 1 && (
          <>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline"
           size={20} color="#14B8A6" />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="cake" size={20}
           color="#14B8A6" />
          <TextInput
            placeholder="Age"
            keyboardType="numeric"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="male-female-outline"
           size={20} color="#14B8A6" />
          <TextInput
            placeholder="Gender"
            style={styles.input}
            value={gender}
            onChangeText={setGender}
          />
        </View>
        </>
        )}  

        {/* STEP 2 */}
        {step === 2 && (
          <>
        <View style={styles.inputContainer}>
          <Ionicons name="school-outline"
           size={20} color="#14B8A6" />
          <TextInput
            placeholder="School"
            style={styles.input}
            value={school}
            onChangeText={setSchool}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="graduation-cap" size={18} color="#14B8A6" />
          <TextInput
            placeholder="Grade"
            style={styles.input}
            value={grade}
            onChangeText={setGrade}
          />
        </View>
        </>
        )}


        {/* STEP 3 */}
        {step === 3 && (
          <>
        <View style={styles.inputContainer}>
          <Ionicons name="briefcase-outline" size={20} color="#14B8A6" />
          <TextInput
            placeholder="Career Interest"
            style={styles.input}
            value={career}
            onChangeText={setCareer}
          />
        </View>
        </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
          <Text style= {{fontSize: 18, 
            marginBottom: 10 }}>
              Review your information
            </Text>
          
            <Text> Name: {name}</Text>
            <Text> Age: {age}</Text>
            <Text> Gender: {gender}</Text>
            <Text> School: {school}</Text>
            <Text> Grade: {grade}</Text>
            <Text> Career Interest: {career}</Text>
          </>
        )}

        {step == 1 && (
          <>
          {/* Full Name */ }
          {/* Age */ }
          {/* Gender */ }     
          </>
        )}

        {step == 2 && (
          <>
          {/* School */ }
          {/* Grade */ }     
          </>
        )}

        {step == 3 && (
          <>
          {/* Career Interest */ }     
          </>
        )}

        {step == 4 && (
          <>
            <Text> Name: {name}</Text>
            <Text> Age: {age}</Text>
            <Text> Gender: {gender}</Text>
            <Text> School: {school}</Text>
            <Text> Grade: {grade}</Text>
            <Text> Career Interest: {career}</Text>
          </>
        )}

        {step >1 &&(
          <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep(step - 1)}
        >
          <Text style={styles.backButtonText}>← 
            Back</Text>
        </TouchableOpacity> 
        )}




        <TouchableOpacity style={styles.button}

        onPress={() => {
          if (step < 4) {
            setStep(step + 1);
          } else {  
          router.push('/UserProfilePage');
          }
          }}
          // Here you can handle the submission of the form, e.g., save the data or navigate to another screen
        >
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

backButton: {
  alignItems: "center",
  marginTop: 15,
},

backButtonText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#2563EB",
},


  header: {
    padding: 25,
    paddingTop: 60,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 5,
  },

  progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#14B8A6",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D1D5DB",
  },

  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#D1D5DB",
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
