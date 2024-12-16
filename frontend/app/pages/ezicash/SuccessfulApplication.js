import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import HighHeader from "../../components/HighHeader";
import { __gstyles__ } from "../../globalStylesheet";

const SuccessfulApplication = ({ route, navigation }) => {
  const {formData} = route.params || {};
  const navigator = useNavigation();

  const handleConfirm = async () => {
    navigator.navigate("Dashboard", {formData});
  };

  return (
    <View style={{flex: 1}}>
      <View className='items-center'>
        <HighHeader title="" position="low" />
      </View>
      
      <View style={styles.container}>
        <View style={[__gstyles__.shadow, {marginTop: -75, padding: 20}]} className='bg-primary-bg items-center rounded-2xl'>
          <View style={[__gstyles__.shadow,{zIndex: 10, marginTop: -95, backgroundColor: '#f9f9f9', padding: 10}]} className='items-center justify-center rounded-full'>
            <Text style={[styles.checkmark, {fontSize: 50, width: 100, height: 100, textAlign: "center", top: 10}]}>✔</Text>
          </View>
          <Text className='text-xl text-center w-full font-semibold text-gray-600 pt-8'>
            Applied Successfully
          </Text>
          <Text className='w-full text-center text-gray-400'>
            You can now track the status of your application. Please check it from time to time.
          </Text>
          <View className='pt-16 self-center w-full items-center justify-center'>
            <TouchableOpacity className='w-full bg-primary p-4 rounded-xl' onPress={handleConfirm}>
              <Text className='text-center text-white font-bold text-lg'>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SuccessfulApplication;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
      overflow:'visible',
      
  },
  header: {
      marginBottom: 20,
  },
  headerText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
  },
  checkmark: {
    color: "#000",
    fontWeight: "bold",
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
