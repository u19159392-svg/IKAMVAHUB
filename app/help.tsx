import { StyleSheet, Text, View } from "react-native";

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <Text style={styles.text}>📧 Email: u24807992@tuks.co.za</Text>
      <Text style={styles.text}>📞 Phone: 0639527797</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:22, fontWeight:"bold", marginBottom:20 },
  text: { fontSize:16, marginBottom:10 },
});