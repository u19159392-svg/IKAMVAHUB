import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

    export default function SetupScreen(){
        const router=useRouter();

        const [name , Setname]=useState(" ");
        const [age , SetAge]= useState( " ");
        const [gender , SetGender]= useState(" ");
        const [school, SetSchool]= useState(" ");
        const [grade, SetGrade]= useState(" ");
        const [careerInterest, SetCareerInterest]= useState(" ");

        const handleContinue =()=> {
            if(
                !name ||
                !age ||
                !gender ||
                !school ||
                !grade ||
                !careerInterest
            ) {
                Alert.alert("Missing info","Please enter all required fields."

                );
                return;

                /*router.push("/login");-still need to create a login page(created by philasande)*/ 
            
            }
            
        };
        return(
            <View style={{ padding: 20 }}>
            
                <Text style={{ fontSize: 28, fontWeight: "bold"}}>
                Welcome to IkamvaHub
                </Text>

                /*Full Name Details*/
                <Text> Full Name</Text>
                <TextInput
                placeholder="Enter your full name"
                value={name}
                onChangeText={Setname}
                style={{
                    borderWidth:1,
                    borderColor:"#ccc",
                    padding:12,
                    marginTop:5,
                    marginBottom:20,
                    borderRadius:8,
                }}
                />
                /*Age Details */
                <Text>Age</Text>
                <TextInput
                placeholder="Enter your full age"
                value={age}
                onChangeText={SetAge}
                keyboardType="numeric"
                style={{
                    borderWidth:1,
                    borderColor:"#ccc",
                    padding:12,
                    marginTop:5,
                    marginBottom:20,
                    borderRadius:8,
                }}
                />

                /*Gender Details */
                <Text>Gender</Text>
                <TextInput
                placeholder="Male/Female/Other"
                value={gender}
                onChangeText={SetGender}
                style={{
                    borderWidth:1,
                    borderColor:"#ccc",
                    padding:12,
                    marginTop:5,
                    marginBottom:20,
                    borderRadius:8,
                }}
                />

                /*School Details */
                <Text>School</Text>
                <TextInput
                placeholder="Enter your full school name"
                value={school}
                onChangeText={SetSchool}
                style={{
                    borderWidth:1,
                    borderColor:"#ccc",
                    padding:12,
                    marginTop:5,
                    marginBottom:20,
                    borderRadius:8,
                }}
                />

                /*Grade Details*/
                <Text>Grade</Text>
                <TextInput
                placeholder="Enter your grade"
                value={grade}
                onChangeText={SetGrade}
                keyboardType="numeric"
                style={{
                    borderWidth:1,
                    borderColor:"#ccc",
                    padding:12,
                    marginTop:5,
                    marginBottom:20,
                    borderRadius:8,
                }}
                />

                /*Career Interest Detais */
                <Text>Career Interest</Text>
                <TextInput
                placeholder="Engineering, Medicine, Information Technology..."
                value={careerInterest}
                onChangeText={SetCareerInterest}
                style={{
                    borderWidth:1,
                    borderColor:"#ccc",
                    padding:12,
                    marginTop:5,
                    marginBottom:20,
                    borderRadius:8,
                }}
                />

                <TouchableOpacity
                onPress={handleContinue}
                style={{
                    backgroundColor:"#2OB2AA",
                    padding:15,
                    borderRadius:10,
                    marginTop:25,
                    alignItems:"center",
                }}
                >
                    <Text
                    style={{
                        color:"white",
                        fontSize:18,
                        fontWeight:"bold",
                    }}>
                    Continue
                </Text>
                </TouchableOpacity>
            </View>
        );
        
    }