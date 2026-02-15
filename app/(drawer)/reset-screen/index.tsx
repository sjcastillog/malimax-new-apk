import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ResetInProgressScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000080" />
      <Text style={styles.text}>Reseteando base de datos...</Text>
      <Text style={styles.subtext}>Por favor espera</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: "#262626",
  },
  subtext: {
    fontSize: 14,
    color: "#8c8c8c",
    marginTop: 8,
  },
});