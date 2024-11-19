import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { __gstyles__, colors } from "../globalStylesheet";
import HighHeader from "../components/HighHeader";
import HighHeaderV2 from "../components/HighHeaderV2";
import { AirbnbRating, Rating } from "react-native-ratings";

const PaymentConfirm = ({ route, navigation }) => {
  const { formData, payment, key, partner } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0,
    init: false,
    active: 0
  });

  useEffect(() => {
    if(!state.init) {
      setState(prev => ({...prev, init: true}));
    } else {

    }
  },[key]);

  const handleConfirm = async () => {
    // try {
    //     const response = await fetch('http://192.168.1.33:3000/register', {
    //         method: 'POST',
    //         credentials: 'include',
    //     }, formData);

    //   alert("Details saved successfully!");
    //   navigation.navigate("Home");

    // } catch (error) {

    //   console.error(error);
    //   alert("Error saving details. Please try again.");
    // }
    navigator.navigate("SetMPIN", { formData });
  };

  const handleNext = () => {
    navigator.navigate("Partner", { formData,  partner: {name: "Nicole Ayessa Alcover"}});
  };

  return (
    <View style={{flex: 1}}>
      <View className='items-center'>
        <HighHeader title="Partner" position="mid" />
      </View>
      <View className='bg-primary-bg items-center'>
        <Image style={{zIndex: 10, marginTop: -75}} className=' ' source={require("../../public/image/profile-pic-outline.png")}/>
        <Image style={{zIndex: 10, marginTop: -127}} className=' ' source={require("../../public/image/pic.png")}/>
      </View>
      <ScrollView style={styles.container}>
        

        <View style={[__gstyles__.shadow]} className='bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={styles.header} className=' flex-row gap-2 w-full pt-8 items-center justify-center self-center'>
            <View>
              <Image alt="cash in"  source={require("../../public/icn/available-icn.png")}></Image>
            </View>
            <Text className='text-primary inline font-semibold text-xl'>{partner.name}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>E-wallet</Text>
              </View>
            </View>
            <View>
              <Text className='text-primary text-base text-primary'>{payment.bank}</Text>
            </View>
          </View>
          
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Service</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{payment.service}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Amount</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{parseInt(payment.amount).toFixed(2)}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Transaction Fee</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>15.00</Text>
          </View>
        </View>


        <View className='py-8 mx-auto self-center w-full'>
          <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
            <Text className='font-bold text-white text-center w-full'>OK</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default PaymentConfirm;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
      overflow:'visible'
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
