import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { __gstyles__ } from "../globalStylesheet";

const AddAmount = ({ route, navigation }) => {
  const { formData } = route.params;
  const wLabels = {...formData};
  const navigator = useNavigation();
  const [state, setState] = useState({
    linkedWallet: formData.user_phone_no,
    amount: 0
  });
  console.log("formData", formData);
  const handleConfirm = async () => {
    navigator.navigate("SearchPartner", {
      formData,
      amount: state.amount,
    });

  };
  
  const handleNext = () => {
    alert(5);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView>
      <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Currently Linked</Text>
        </View>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={handleNext}>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image alt="cash in" source={require("../../public/icn/location-icn.png")}></Image>
              <View style={styles.leftSection}>
                <Text className='font-semibold text-lg text-primary'>Home</Text>
                <Text className='text-sm text-primary'>
                  {formData.address},
                </Text>
              </View>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.scrollContainer} className='px-8 py-8 bg-gray-300 rounded-lg'>
          <View style={styles.header}>
            <Text className='text-primary font-semibold text-xl'>Enter Amount</Text>
          </View>
          <TextInput
            className=' p-4 border-b border-black mb-4 text-lg'
            placeholder="Enter your amount"
            value={state.amount}
            onChangeText={(am) => setState(prev => ({...prev, amount: am}))}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Text className='text-base text-primary text-right'>
            0.00
          </Text>
          <Text className='text-sm text-primary text-right'>
            Available Balance
          </Text>
        </View>
      </ScrollView>
      <View className='py-4 mx-auto self-center absolute bottom-4 w-full'>
        <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
          <Text className='font-bold text-white text-center w-full'>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAmount;

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
      marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},
  buttonIcon: {
      marginLeft: 10,
  },
  footerBtnContainer: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  footerBtnLabel : {
    maxWidth: 100,
    fontSize: 10
  },
  footer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  resendText: {
      fontSize: 16,
      color: "#007BFF",
      textDecorationLine: "underline",
      marginVertical: 5,
  },
});
