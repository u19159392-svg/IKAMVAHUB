import React, {useEffect, useState} from 
"react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { getSchools } from "./db/Database";

export default function Schools() {

    const [schools, setSchools] = useState<any[]>([]);

    useEffect(() => {
        loadSchools();
    }, []);

    const loadSchools = async () => {
        const data = await getSchools();
        setSchools(data);
    };

    const renderSchool = ({ item }: {item: any}) => (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.schoolName}
            >{item.name}</Text>
            <Text style={styles.cardText}>Province: 
                {item.province}</Text>
                <Text style={styles.cardText}>Type: 
                    {item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Schools</Text>
            <FlatList
                data={schools}
                keyExtractor={(item: any) => 
                    item.id.toString()}
                renderItem={renderSchool}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: "#F5F5F5",
        paddingTop: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
        elevation: 3,
    },

    schoolName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#00ACC1",
        marginBottom: 6,
    },

    cardText: {
        fontSize: 15,
        color: "#555",
        marginBottom: 4,    
    },
});
