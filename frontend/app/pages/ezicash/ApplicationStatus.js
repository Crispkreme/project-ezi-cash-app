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
  Image
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from "@react-navigation/native";
import DropdownComponent from "../../components/DropdownComponent";
import * as FileSystem from 'expo-file-system';

const ApplicationStatus = ({route}) => {
  const navigation = useNavigation();
  const {formData} = route.params || {};

  // Navigate to ConfirmAccount
  const handleNext = async (e) => {
    navigation.navigate("Dashboard", { formData });
  };
  
  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground source={require("../../../public/image/bg.png")} style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Image className='ml-4' style={styles.back} source={require("../../../public/image/back.png")}/>
      </TouchableOpacity>
      <ScrollView style={{padding: 20, top: 100, flex: 1}} className='bg-primary-bg rounded-t-2xl relative'>
        <View style={styles.header}>
          <Text style={styles.headerText} className='text-center pt-4'>Application Status</Text>
          <Text className='text-gray-400 text-center'>Track your application Status.</Text>
        </View>

        <View className='text-primary flex-row gap-2 justify-center pt-16'>
          
          <View className='relative justify-end items-center gap-4'>
            <Text className='text-primary text-xs max-w-[60px]'>Registration</Text>
            <Image style={{width: 30, height: 30}} source={require("../../../public/image/status-check.png")}/>
          </View>
          
          <View className='relative justify-end items-center gap-4'>
            <Text className='text-primary text-center text-xs max-w-[60px]'>Application Form</Text>
            <Image style={{width: 30, height: 30}} source={require("../../../public/image/status-check.png")}/>
          </View>

          <View className='relative justify-end items-center gap-4'>
            <Text className='text-primary text-xs max-w-[60px]'>Verifying Documents</Text>
            <Image style={{width: 30, height: 30}} source={require("../../../public/image/status-check.png")}/>
          </View>

          <View className='relative justify-end items-center gap-4'>
            <Text className='text-primary text-xs max-w-[60px]'>Agreements</Text>
            <Image style={{width: 30, height: 30}} source={require("../../../public/image/status-check.png")}/>
          </View>

          <View className='relative justify-end items-center gap-4'>
            <Text className='text-primary text-xs max-w-[60px]'>Application Approved</Text>
            <Image style={{width: 30, height: 30}} source={require("../../../public/image/status-check.png")}/>
          </View>
        </View>
        <View style={{top: -30, zIndex: -1}} className='justify-center flex-row'>
          <View
            className='m-4 border-blue-500'
            style={{
              width: '80%',
              borderBottomWidth: 5,
            }}
          />
        </View>

        <View style={[styles.footer, {flex: 1}]}>
          <TouchableOpacity className='w-full p-4 mb-16 bg-primary rounded-lg mt-64' onPress={handleNext}>
            <Text className='text-white font-semibold text-lg text-center'>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ApplicationStatus;

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
  checked: {
    backgroundColor: "#6200ea",
    borderColor: "#6200ea",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
});
