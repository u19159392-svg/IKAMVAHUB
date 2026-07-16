import React , {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams} from "expo-router";
import {getSchoolById} from "./db/Database";

//========Day 2 Task 4 =====
export default function SchoolDetails( ) {
    const{id} = useLocalSearchParams();
    const [school, setSchool]=
    useState <any> (null);
     
    useEffect (() => {
        const loadSchool = async () => {
            const data = await 
            getSchoolById(Number(id));
            setSchool(data);
        };

        loadSchool();
    }, [id]);
    
    return (
        <View style={styles.container}>
            <Text style={styles.schoolName}>{school?.name}</Text>
            <Text style={styles.info}>{school?.type}</Text>
            <Text style={styles.info}>{school?.province}</Text>
            <Text style={styles.info}>{school?.address}</Text>
            <Text style={styles.info}>{school?.contactNumber}</Text>

            <Text style={styles.info}>Principal: {school?.principal}</Text>
            <Text style={styles.info}>Quintile: {school?.quintile}</Text>
            <Text style={styles.info}>EMIS: {school?.emis}</Text>
            <Text style={styles.info}>Grades: {school?.grades}</Text>
            <Text style={styles.info}>Learners: {school?.learners}</Text>
            <Text style={styles.info}>Teachers: {school?.teachers}</Text>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        schoolName: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
        },
        info: {
            fontSize: 16,
            marginBottom: 4,
        },
    });