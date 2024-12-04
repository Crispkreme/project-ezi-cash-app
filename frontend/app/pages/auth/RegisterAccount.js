import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/DropdownComponent";

const RegisterAccount = ({route}) => {
  const navigation = useNavigation();
  const {mobileNumber} = route.params || {};

  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredBarangays, setFilteredBarangays] = useState([]);
  const [formData, setFormData] = useState({
    user_phone_no: mobileNumber,
    first_name: "",
    middle_name: "",
    last_name: "",
    birthdate: new Date(),
    email: "",
    nationality: "Nationality",
    main_source: "Main Source of Funds",
    province: "",
    city: "City/Municipality",
    barangay: "",
    zipcode: "",
    HasNoMiddleName: false,
  });

  const provinces = [
    {
      province: "Cebu",
      city: [
        {
          city: "Cebu City (Capital)",
          barangay: [
            { barangay: "Adlawon", zipcode: 6000 },
            { barangay: "Agsungot", zipcode: 6000 },
            { barangay: "Apas", zipcode: 6000 },
          ],
        },
        {
          city: "Lapu-Lapu City",
          barangay: [
            { barangay: "Pajo", zipcode: 6015 },
            { barangay: "Marigondon", zipcode: 6015 },
            { barangay: "Gun-ob", zipcode: 6015 },
          ],
        },
        {
          city: "Mandaue City",
          barangay: [
            { barangay: "Bakilid", zipcode: 6014 },
            { barangay: "Banilad", zipcode: 6014 },
            { barangay: "Basak", zipcode: 6014 },
          ],
        },
      ],
    },
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
  const handleNationalityChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      nationality: value,
    }));
  };
  const handleFundSourceChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      main_source: value,
    }));
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, birthdate: selectedDate });
    }
  };
  const handleProvinceChange = (value) => {
    const selectedProvince = provinces.find((prov) => prov.province === value);
    setFormData({
      ...formData,
      province: value,
      city: "City/Municipality",
      barangay: "Barangay",
      zipcode: "",
    });
    setFilteredCities(selectedProvince ? selectedProvince.city : []);
    setFilteredBarangays([]);
  };
  const handleCityChange = (value) => {
    const selectedCity = filteredCities.find((city) => city.city === value);
    setFormData({
      ...formData,
      city: value,
      barangay: "Barangay",
      zipcode: "",
    });
    setFilteredBarangays(selectedCity ? selectedCity.barangay : []);
  };
  const handleBarangayChange = (value) => {
    const selectedBarangay = filteredBarangays.find(
      (brgy) => brgy.barangay === value
    );
    setFormData({
      ...formData,
      barangay: value,
      zipcode: selectedBarangay ? selectedBarangay.zipcode.toString() : "",
    });
  };

  // Navigate to ConfirmAccount
  const handleNext = () => {
    navigation.navigate("ConfirmAccount", { formData: {...formData, birthdate: formData.birthdate.toLocaleDateString()} });
  };

  const handleDropdownFocus = () => {
    setShowDatePicker(false);
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
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.shadow} className="rounded-md mb-2">
          <Text className="border border-gray-300 rounded-md p-4 bg-white">
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

        <View className="mb-4">
          <DropdownComponent
            setState={handleNationalityChange}
            data={nationality}
            placeholder="Nationality"
          />
        </View>

        <View className="mb-4">
          <DropdownComponent
            setState={handleFundSourceChange}
            data={fundSource}
            placeholder="Main Source of Funds"
            onFocus={() => setShowDatePicker(false)}
          />
        </View>

        <View>
          <Text className='text-lg font-semibold mb-4'>CURRENT ADDRESS</Text>
        </View>
        
        <View className='mb-4'>
          <DropdownComponent
            setState={(value) => handleProvinceChange(value)}
            data={provinces.map((prov) => ({
              value: prov.province,
              label: prov.province,
            }))}
            placeholder={"Select Province"}
          />
        </View>

        <View className='mb-4'>
          <DropdownComponent
            setState={(value) => handleCityChange(value)}
            data={filteredCities.map((city) => ({
              value: city.city,
              label: city.city,
            }))}
            placeholder={"Select City/Municipality"}
            disabled={filteredCities.length === 0}
          />
        </View>

        <View className='mb-4'>
          <DropdownComponent
            setState={(value) => handleBarangayChange(value)}
            data={filteredBarangays.map((brgy) => ({
              value: brgy.barangay,
              label: brgy.barangay,
            }))}
            placeholder={"Select Barangay"}
            disabled={filteredBarangays.length === 0}
          />
        </View>

        <TouchableOpacity style={styles.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Zipcode"
            value={formData.zipcode}
            editable={false}
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
