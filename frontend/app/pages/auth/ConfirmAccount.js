import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const ConfirmAccount = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const handleConfirm = async () => {
    navigator.navigate("SetMPIN", {formData, isReset: false});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text className='text-primary font-semibold text-xl pt-8'>Review Information Added</Text>
        <Text className='text-gray-400'>Make sure everything is correct. You can no longer edit these details once you register.</Text>
      </View>
      <ScrollView>
        {/* Display form data */}
        {Object.entries(formData).map(([key, value]) => (
          key !== "HasNoMiddleName" && (
            <View key={key}>
              {key === "FirstName" && <Text className='text-xl mb-6'>PERSONAL INFORMATION</Text>}
              <Text style={styles.key} className='text-lg font-light text-gray-300'>{String(String(key).replaceAll("_"," ")).charAt(0).toUpperCase() + String(String(key).replaceAll("_"," ")).slice(1)}:</Text>
              <Text className='mb-4 text-gray-600'>{key !== "Birthdate" ? value : value}</Text>
              {key === "Province" && <Text className='text-xl mb-6 mt-4'>CURRENT ADDRESS</Text>}
            </View>
          )
        ))}
      </ScrollView>
      <View className='py-2'>
        <Text className='text-gray-400 mb-2 text-center text-sm'>Press Back to edit Details</Text>
        <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
          <Text className='font-bold text-white text-center'>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmAccount;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  key: {color: '#6b7280'},
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
