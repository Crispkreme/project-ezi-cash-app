import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { __gstyles__ } from "../globalStylesheet";

const EWallet = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222'
  });

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
    navigator.navigate("SetMPIN");
  };

  const handleNext = () => {
    navigator.navigate("AddAmount", {formData});

  };

  const linkEWallet = () => {
    navigator.navigate("LinkLogin", {formData});
  }

  return (
    <View style={styles.container}>
      
      <ScrollView>
      <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Currently Linked</Text>
        </View>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={handleNext}>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image alt="cash in" source={require("../../public/icn/linked-icn.png")}></Image>
              <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
              <View style={styles.leftSection}>
                <Text className='font-semibold text-lg text-primary'>E-Wallet</Text>
                <Text className='text-sm text-primary'>
                    {state.linkedWallet.substring(0,2)}*******{state.linkedWallet[state.linkedWallet.length - 1]}
                </Text>
              </View>
            </View>
            <Entypo
              name="dots-three-vertical"
              size={16}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Add E-Wallet</Text>
        </View>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={linkEWallet}>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
              <View style={styles.leftSection}>
                <Text className='font-semibold text-lg text-primary'>E-Wallet</Text>
              </View>
            </View>
            <AntDesign
              name="pluscircleo"
              size={16}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={linkEWallet}>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
              <View style={styles.leftSection}>
                <Text className='font-semibold text-lg text-primary'>E-Wallet</Text>
              </View>
            </View>
            <AntDesign
              name="pluscircleo"
              size={16}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer} className='py-2 flex-row gap-4'>
        
        <View style={styles.footerBtnContainer} className='relative' onPress={handleConfirm}>
          <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
        </View>

        <View style={styles.footerBtnContainer} className='flex-start'  onPress={handleConfirm}>
          <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
        </View>

        <View style={styles.footerBtnContainer} className='flex-start'  onPress={handleConfirm}>
          <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
        </View>

        <View style={styles.footerBtnContainer} onPress={handleConfirm}>
          <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Settings</Text>
        </View>
      </View>
    </View>
  );
};

export default EWallet;

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
