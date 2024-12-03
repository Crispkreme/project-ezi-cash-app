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
import DropdownComponent from "../../components/DropdownComponent";

const RegisterAccount = ({route}) => {
  const navigation = useNavigation();
  const {mobileNumber} = route.params || {};
  const [formData, setFormData] = useState({
    user_phone_no: mobileNumber,
    first_name: "John",
    middle_name: "Sample",
    last_name: "Doe",
    birthdate: new Date(), // Default to the current date
    email: "johndoe@gmail.com",
    nationality: "Nationality",
    main_source: "Main Source of Funds",
    province: "Province",
    city: "City/Municipality",
    barangay: "Barangay",
    zipcode: "",
    HasNoMiddleName: false,
  });

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const nationality = [
    { label: 'Filipino', value: 'Filipino' },
  ]

  const fundSource = [
    { label: 'Job', value: 'Job' },
    { label: 'Allowance', value: 'Allowance' },
    
  ]

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
      middle_name: !prev.HasNoMiddleName ? "" : prev.middle_name,
    }));
  };

  // Handle Date Picker Change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, birthdate: selectedDate });
    }
  };

  // Navigate to ConfirmAccount
  const handleNext = () => {
    navigation.navigate("ConfirmAccount", { formData: {...formData, birthdate: formData.birthdate.toLocaleDateString()} });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
        <Text className='text-primary font-semibold text-xl pt-8'>Tell us something about yourself</Text>
        <Text className='text-gray-400'>Make sure everything is correct. You can no longer edit these details once you register.</Text>
      </View>

      <ScrollView className='text-primary'>
        <Text className='text-lg font-semibold mb-4'>PERSONAL INFORMATION</Text>
        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(value) => handleInputChange("first_name", value)}
          />
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

        {!formData.HasNoMiddleName && (
          <>
          <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
            <TextInput
              className='border border-gray-300 rounded-md p-4 bg-white'
              placeholder="Middle Name"
              value={formData.middle_name}
              onChangeText={(value) => handleInputChange("middle_name", value)}
            />
          </TouchableOpacity>
          <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>
          </>
        )}

        <View className='flex-row gap-2 pl-4'>
          <TouchableOpacity
            style={[styles.checkbox, formData.HasNoMiddleName && styles.checked]}
            onPress={toggleNoMiddleName}
          >
            {formData.HasNoMiddleName && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text className='text-sm text-gray-400 mb-2'>I do not have a middle name</Text>
        </View>

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(value) => handleInputChange("last_name", value)}
          />
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.shadow} className='rounded-md mb-2'>
          <Text className='border border-gray-300 rounded-md p-4 bg-white'>
          {formData.birthdate
              ? formData.birthdate.toDateString()
              : "Select Birthdate"}
          </Text>
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Must be 12 or older to create an eZiCash Account</Text>
        {showDatePicker && (
          <DateTimePicker
            value={formData.birthdate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </TouchableOpacity>
        <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={nationality} placeholder={"Nationality"}/>
        </View>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={fundSource} placeholder={"Main Source of Funds"}/>
        </View>

        <View>
          <Text className='text-lg font-semibold mb-4'>CURRENT ADDRESS</Text>
        </View>
        
        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={data} placeholder={"Province"}/>
        </View>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={data} placeholder={"City/Municipality"}/>
        </View>

        <View className='mb-4'>
          <DropdownComponent setState={setFormData} data={data} placeholder={"Barangay"}/>
        </View>

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Zipcode"
            value={formData.zipcode}
            onChangeText={(value) => handleInputChange("zipcode", value)}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity className='w-full p-4 bg-primary rounded-lg' onPress={handleNext}>
          <Text className='text-white font-semibold text-lg text-center'>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
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
