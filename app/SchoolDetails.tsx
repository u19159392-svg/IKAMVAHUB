import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getSchoolById } from "./db/Database";

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
    export const schools = [
  {
    id: "1",
    name: "Baleni Secondary School",
    type: "Public",
    district: "Alfred Nzo East",
    town: "Bizana",
    facilities: [
      "Classrooms",
      "Government-owned buildings",
      "Limited rural infrastructure",
      "Soccer Field",
      "Netball Court",
      "Government Textbooks",
      "Stationery"
    ]
  },

  {
    id: "2",
    name: "Bonxa High School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Tabankulu",
    facilities: [
      "Classrooms",
      "Government-owned buildings",
      "Government-owned land",
      "Soccer Field",
      "Netball Court"
    ]
  },

  {
    id: "3",
    name: "Toleni Secondary School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
    facilities: [
      "Standard Government Classrooms",
      "School Grounds",
      "Soccer Field",
      "Netball Court"
    ]
  },

  {
    id: "4",
    name: "Tyelimhlophe Secondary School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
    facilities: [
      "Classrooms",
      "Agricultural Demonstration Area",
      "Agricultural Practical Area",
      "School Garden",
      "Soccer Field",
      "Netball Court",
      "Government Textbooks",
      "Stationery"
    ]
  },

  {
    id: "5",
    name: "Dangwana Senior Secondary School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
    facilities: [
      "Classrooms",
      "Government-owned Buildings",
      "School Grounds",
      "Soccer Field",
      "Netball Court"
    ]
  },
  {
    id: "6",
    name: "Zibokwana High School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
  facilities: [
    "Classrooms",
    "Government-owned Buildings",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "7",
  name: "Dumsi Senior Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government School Facilities",
    "Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court"
  ]
},

{
  id: "8",
  name: "Zwelitsha High Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "9",
  name: "Mbodleni Senior Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Classrooms",
    "Government-owned Buildings",
    "Government-owned Land",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "10",
  name: "Mfazwe Technical High School",
  type: "Public Technical School",
  district: "Alfred Nzo West",
  town: "Tabankulu",
  facilities: [
    "Classrooms",
    "Computer Laboratory",
    "Engineering Practical Laboratory",
    "Technical Workshops",
    "Civil Technology Workshop",
    "Electrical Technology Workshop",
    "Mechanical Technology Workshop",
    "Engineering Equipment",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},
{
  id: "11",
  name: "Mvenyane High School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government School Facilities",
    "Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "12",
  name: "Mpondombini Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court"
  ]
},

{
  id: "13",
  name: "Ndzululwazi Senior Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Classrooms",
    "Government-owned Buildings",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "14",
  name: "Nomaqwathekana High School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government School Facilities",
    "Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court"
  ]
},

{
  id: "15",
  name: "Ntabankulu Comprehensive Technical High School",
  type: "Public Technical School",
  district: "Alfred Nzo West",
  town: "Ntabankulu",
  facilities: [
    "Classrooms",
    "Technical Workshops",
    "Engineering Practical Laboratories",
    "Mechanical Workshop",
    "Electrical Workshop",
    "Civil Technology Workshop",
    "Computer Laboratory",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
}
    ];