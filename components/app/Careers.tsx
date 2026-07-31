import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CareerCard from "../CareerCard";

import {
  getCareers,
  getCareersByStream,
  searchCareers,
} from "../../app/db/Database";

const STREAMS = [
  "All",
  "Science",
  "Arts",
  "Commerce",
];

export default function Careers() {

  const [careers,setCareers]=useState<any[]>([]);
  const [search,setSearch]=useState("");
  const [stream,setStream]=useState("All");

  const loadCareers=async()=>{
    const data=await getCareers();
    setCareers(data);
  };

  useEffect(()=>{
    loadCareers();
  },[]);

  const handleSearch=async(text:string)=>{
    setSearch(text);

    if(text===""){
      if(stream==="All"){
        loadCareers();
      }else{
        setCareers(await getCareersByStream(stream));
      }
      return;
    }

    setCareers(await searchCareers(text));
  };

  const filterStream=async(selected:string)=>{

    setStream(selected);

    if(selected==="All"){
      loadCareers();
    }else{
      setCareers(await getCareersByStream(selected));
    }

  };

  return(

<View style={styles.container}>

<Text style={styles.title}>
Career Finder
</Text>

<TextInput
style={styles.search}
placeholder="Search Career..."
value={search}
onChangeText={handleSearch}
/>

<View style={styles.tabs}>

{STREAMS.map((item)=>(

<TouchableOpacity
key={item}
style={[
styles.tab,
stream===item && styles.activeTab
]}
onPress={()=>filterStream(item)}
>

<Text
style={[
styles.tabText,
stream===item && styles.activeText
]}
>

{item}

</Text>

</TouchableOpacity>

))}

</View>

<FlatList
data={careers}
keyExtractor={(item)=>item.id.toString()}
renderItem={({item})=><CareerCard career={item}/>}
/>

</View>

  );

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F5F7FA",
paddingTop:20
},

title:{
fontSize:28,
fontWeight:"bold",
textAlign:"center",
marginBottom:15,
color:"#00838F"
},

search:{
backgroundColor:"#fff",
marginHorizontal:15,
padding:12,
borderRadius:12,
marginBottom:15
},

tabs:{
flexDirection:"row",
justifyContent:"space-around",
marginBottom:20
},

tab:{
backgroundColor:"#ddd",
paddingVertical:10,
paddingHorizontal:20,
borderRadius:20
},

activeTab:{
backgroundColor:"#0097A7"
},

tabText:{
fontWeight:"bold"
},

activeText:{
color:"#fff"
}

});