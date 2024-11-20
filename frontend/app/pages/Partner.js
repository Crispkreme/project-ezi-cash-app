import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { __gstyles__, colors } from "../globalStylesheet";
import HighHeader from "../components/HighHeader";
import { AirbnbRating, Rating } from "react-native-ratings";

const Partner = ({ route, navigation }) => {
  const { formData, search, key, partner } = route.params;

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
    navigator.navigate("PaymentConfirm", { formData, partner, payment: {type: "E-wallet", balance: 0, service: "Cash In", amount: 500, bank: "Paypal"} });
  };

  const handleNext = () => {
    navigator.navigate("Partner", { formData,  partner});
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
        <View style={styles.header} className=' flex-row gap-2 w-full pt-8 items-center justify-center self-center'>
          <View>
            <Image alt="cash in"  source={require("../../public/icn/available-icn.png")}></Image>
          </View>
          <Text className='text-primary inline font-semibold text-xl'>{partner.name}</Text>
        </View>

        <View style={[__gstyles__.shadow]} className='bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Address</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{partner.address}</Text>
          </View>
        </View>

        <View style={[__gstyles__.shadow]} className='bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Partner Type</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{partner.type}</Text>
          </View>
        </View>

        <View style={[__gstyles__.shadow]} className='bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Name</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{partner.name}</Text>
          </View>
        </View>

        <View style={[__gstyles__.shadow]} className='bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Ratings</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>
              <Rating imageSize={20} type='custom' ratingColor="white" startingValue={2} ratingImage={require("../../public/icn/star-icn.png")} ratingCount={5}/>
            </Text>
          </View>
        </View>

        <Text className=' inline font-semibold text-xl text-gray-600'>Customer Feedback</Text>
        <View className='pt-2 pb-8 flex-row gap-2 items-center'>
          <TouchableOpacity style={{alignSelf: 'flex-start' }} className='bg-gray-300 rounded-full'>
            <Text className='px-4 py-1 w-full self-center'>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'flex-start' }} className={`${state.active === 5 ? 'bg-gray-300' : ''} rounded-full`}>
            <Text className='px-4 py-1 w-full self-center'>
              5 Stars
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300'>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <View className='flex-row items-center gap-2'>
                  <Text className='font-semibold text-lg text-primary'>
                    <Rating imageSize={10} type='custom' ratingColor="white" startingValue={2} ratingImage={require("../../public/icn/star-icn.png")} ratingCount={5}/>
                  </Text>
                  <Text className='text-sm'>
                    20/04/2024
                  </Text>
                </View>
                <Text className='text-sm text-primary'>
                    The transaction was seamless, I didn’t have any problem while locating the eZiCash partner’s place.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className='py-8 mx-auto self-center w-full'>
          <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
            <Text className='font-bold text-white text-center w-full'>Choose</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Partner;

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
