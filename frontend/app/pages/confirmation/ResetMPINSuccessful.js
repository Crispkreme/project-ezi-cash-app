import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity, ImageBackground } from "react-native";
import { __gstyles__ } from "../../globalStylesheet";
import HighHeader from "../../components/HighHeader";

const ResetMPINSuccessful = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0,
    active: 0,
    accepted: false
  });

  // setTimeout(() => {
  //   navigator.navigate("RatePartner", {formData, partner, payment});
  // },3000);

  const handleBack = () => {
    navigator.goBack();
  }

  // Retrieve user data and login
  const proceed = () => {
    navigator.navigate("Dashboard", {formData: {
      FirstName: "John",
      MiddleName: "Sample",
      LastName: "Doe",
      Birthdate: new Date(), // Default to the current date
      Email: "johndoe@gmail.com",
      Nationality: "Nationality",
      MainSource: "Main Source of Funds",
      Province: "Province",
      City: "City/Municipality",
      Barangay: "Barangay",
      ZipCode: "ZipCode",
      HasNoMiddleName: false,
    }});
  }

  return (
    <ImageBackground style={{flex: 1}} source={require("../../../public/image/bg.png")}>
      <View style={{paddingBottom: 200}} className='bg-primary'>
        <TouchableOpacity onPress={handleBack} className='top-16 left-4'>
          <Image style={styles.back} source={require("../../../public/image/back.png")}/>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View style={[styles.container, {borderRadius: 20}]}>
          <View style={[__gstyles__.shadow, styles.card]} className='absolute w-full bg-primary-bg px-4 py-16 mb-4 border border-gray-300'>
            <View style={styles.header} className=' gap-8 w-full py-4 items-center justify-center self-center'>
              <View style={[__gstyles__.shadow, {padding: 20}]} className='rounded-full'>
                <Image source={require("../../../public/icn/success-icn.png")}/>
              </View>
              <Text className='text-primary font-bold inline font-semibold text-xl'>Reset MPIN Successful!</Text>
              <Text className='text-gray-400 inline text-sm'>You have successfully reset your MPIN. Make sure to change your eZiCash MPIN regularly for protection. </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{padding: 20}} className='py-4 mx-auto self-center absolute bottom-4 w-full'>
          <TouchableOpacity onPress={proceed} className='bg-primary p-4 rounded-lg w-full'>
            <Text className='font-bold text-white text-center'>Ok</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

export default ResetMPINSuccessful;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
      overflow:'visible',
      justifyContent: 'center',
      alignItems: 'center'
  },

  card: {
    top: -80,
    borderRadius: 40,
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
