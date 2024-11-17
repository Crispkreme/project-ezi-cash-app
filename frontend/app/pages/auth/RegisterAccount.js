import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const RegisterAccount = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Birthdate: new Date(), // Default to the current date
    Email: "",
    Nationality: "Nationality",
    MainSource: "Main Source of Funds",
    Province: "Province",
    City: "City/Municipality",
    Barangay: "Barangay",
    ZipCode: "ZipCode",
    HasNoMiddleName: false,
  });

  // State for date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Toggle "No Middle Name" checkbox
  const toggleNoMiddleName = () => {
    setFormData((prev) => ({
      ...prev,
      HasNoMiddleName: !prev.HasNoMiddleName,
      MiddleName: !prev.HasNoMiddleName ? "" : prev.MiddleName,
    }));
  };

  // Handle Date Picker Change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, Birthdate: selectedDate });
    }
  };

  // Navigate to ConfirmAccount
  const handleNext = () => {
    navigation.navigate("ConfirmAccount", { formData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionHeader}>PERSONAL INFORMATION</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.FirstName}
          onChangeText={(value) => handleInputChange("FirstName", value)}
        />
        <Text style={styles.label}>Don’t use business or nicknames.</Text>

        {!formData.HasNoMiddleName && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Middle Name"
              value={formData.MiddleName}
              onChangeText={(value) => handleInputChange("MiddleName", value)}
            />
            <Text style={styles.label}>Don’t use business or nicknames.</Text>
          </>
        )}

        <TouchableOpacity
          style={[styles.checkbox, formData.HasNoMiddleName && styles.checked]}
          onPress={toggleNoMiddleName}
        >
          {formData.HasNoMiddleName && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
        <Text style={styles.label}>I do not have a middle name</Text>

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.LastName}
          onChangeText={(value) => handleInputChange("LastName", value)}
        />
        <Text style={styles.label}>Don’t use business or nicknames.</Text>

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, { justifyContent: "center" }]}
        >
          <Text>
            {formData.Birthdate
              ? formData.Birthdate.toDateString()
              : "Select Birthdate"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>
          Must be 12 or older to create an eZiCash Account
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={formData.Birthdate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.Email}
          onChangeText={(value) => handleInputChange("Email", value)}
        />
        <Text style={styles.label}>Please enter your email address.</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: "#777",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  checked: {
    backgroundColor: "#6200ea",
    borderColor: "#6200ea",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});
