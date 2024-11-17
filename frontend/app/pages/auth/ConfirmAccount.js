import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmAccount = ({ route, navigation }) => {
  const { formData } = route.params;

  const handleConfirm = async () => {
    try {
        const response = await fetch('http://192.168.1.33:3000/register', {
            method: 'POST',
            credentials: 'include',
        }, formData);

      alert("Details saved successfully!");
      navigation.navigate("Home");

    } catch (error) {

      console.error(error);
      alert("Error saving details. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Your Details</Text>

      {/* Display form data */}
      {Object.entries(formData).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{key}:</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm and Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmAccount;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  label: { fontWeight: "bold" },
  value: { color: "#555" },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
