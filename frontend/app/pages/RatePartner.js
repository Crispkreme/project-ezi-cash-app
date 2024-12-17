import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HighHeader from "../components/HighHeader";
import { Rating } from "react-native-ratings";

const RatePartner = ({ route, navigation }) => {
  const { formData, transactionData } = route.params;

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
  
  return (
    <View style={{flex: 1}}>
      <View className='items-center'>
        <HighHeader title="Rate eZiCash Partner" position="low" />
      </View>
      <View className='bg-primary-bg items-center'>
        <Image style={{zIndex: 10, marginTop: -75}} className=' ' source={require("../../public/image/profile-pic-outline.png")}/>
        <Image style={{zIndex: 10, marginTop: -127}} className=' ' source={require("../../public/image/pic.png")}/>
      </View>
      <ScrollView style={styles.container}>
        <View style={{justifyContent: 'space-between'}} className='flex-row items-center px-4'>
          <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.leftSection}>
              <Text className='text-gray-400 text-base'>eZiCash Partner</Text>
            </View>
          </View>
          <View style={{justifyContent:'flex-end', alignItems: 'flex-end'}}>
            <Text className='text-sm'>{formData.name}</Text>
          </View>
        </View>

        <Rating style={{marginTop: 40}} imageSize={40} type='custom' ratingColor="white" startingValue={2} ratingImage={require("../../public/icn/star-icn.png")} ratingCount={5}/>

        <View className='p-4'>
          <View
            className='m-4 border-gray-500'
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
        <Text className=' inline font-semibold text-xl text-gray-600'>Enter Feedback</Text>

        <View className='flex-row'>
          <TextInput
            className='w-full p-4 mt-4 mb-4 text-sm bg-gray-200'
            placeholder="Send message"
            value={state.amount}
            onChangeText={(am) => setState(prev => ({...prev, amount: am}))}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <MaterialIcons
            name="send"
            size={16}
            className=' absolute right-4 top-8'
            style={styles.buttonIcon}
          />
        </View>

      </ScrollView>
    </View>
  );
};

export default RatePartner;

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
