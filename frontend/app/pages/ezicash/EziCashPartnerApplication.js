import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/DropdownComponent";

const EziCashPartnerApplication = ({route}) => {
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
    zipcode: "ZipCode",
    HasNoMiddleName: false,
  });

  const [applyData, setApplyData] = useState({
    legal_name: "",
    partnership_type: "",
    phone_no: "",
    email: "",
    legal_address: "",
    city: "",
    state: "",
    zip: "",
    business_location: "",
    business_city: "",
    business_state: "",
    business_zip: "",
    business_permit: null,
    government_id: null,
    proof_of_address: null,
    bank: "",
    bank_account_id: "",
    account_id: "",
    card_no: "",
    card_holder: "",
  })

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
    setApplyData({ ...applyData, [field]: value });
  };

  // Navigate to ConfirmAccount
  const handleNext = () => {
    navigation.navigate("ConfirmAccount", { formData: {...formData, birthdate: formData.birthdate.toLocaleDateString()} });
  };

  return (
    <ImageBackground source={require("../../../public/image/bg.png")} style={styles.container}>
      <ScrollView style={{padding: 20}} className='bg-primary-bg rounded-t-2xl'>
        <View style={styles.header}>
          <Text style={styles.headerText} className='text-center pt-4'>Application</Text>
          <Text className='text-gray-400 text-center'>Apply to be an eZiCash Partner.</Text>
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

          <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
            <TextInput
              className='border border-gray-300 rounded-md p-4 bg-white'
              placeholder="Last Name"
              value={formData.last_name}
              onChangeText={(value) => handleInputChange("last_name", value)}
            />
          </TouchableOpacity>
          <Text className='text-sm text-gray-400 mb-2'>Don't use business or nicknames.</Text>

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
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity className='w-full p-4 bg-primary rounded-lg' onPress={handleNext}>
            <Text className='text-white font-semibold text-lg text-center'>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EziCashPartnerApplication;

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
    paddingTop: 50,
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
