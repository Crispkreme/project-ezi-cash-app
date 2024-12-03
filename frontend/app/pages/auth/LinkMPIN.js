import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Rating } from "react-native-ratings";
import HighHeader from "../../components/HighHeader";
import { __gstyles__ } from "../../globalStylesheet";

const LinkMPIN = ({ route, navigation }) => {
  const { formData, linkedWallet } = route.params;
  const navigator = useNavigation();
  const inputs = useRef([]);
  const tempPin = "1234";

  const [state, setState] = useState({ 
    linkedWallet: '',
    pin: Array(4).fill("")
  });

  const handleConfirm = async () => {
    const final = state.pin.join("");
    if(final !== tempPin) {

    } else {
      navigator.navigate("SuccessfulLink", { formData, linkedWallet });
    }
    
  };

  const textInputOnKeyPress = (nativeEvent, index) => {
    inputs.current[index].value = '';
    if(nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1].focus();
    }
  }

  const handleChange = (text, index) => {
    const newPin = [...state.pin];
    newPin[index] = text;
    setState(prev => ({...prev, pin: newPin}));

    if (text && index < state.pin.length - 1) {
      inputs.current[index + 1].focus();
    }

  };

  return (
    <View style={{flex: 1}}>
      <View className='items-center'>
        <HighHeader title="Linking E-Wallet" position="low" />
      </View>
      
      <View style={styles.container}>
        <View style={[__gstyles__.shadow, {marginTop: -75, padding: 20}]} className='bg-primary-bg items-center rounded-2xl'>
          <View style={[__gstyles__.shadow,{zIndex: 10, marginTop: -95, backgroundColor: '#f9f9f9', padding: 10}]} className='rounded-full'>
            <Image  className=' ' source={require("../../../public/icn/link-e-wallet-icn.png")}/>
          </View>
          <Text className='text-xl text-left w-full font-semibold text-gray-600 pt-8'>
            Log in to link with E-wallet
          </Text>
          <Text className='w-full text-gray-400'>
            Enter the 6-digit authentication code sent to your registered mobile number.
          </Text>
          <View style={styles.otpContainer} className=' gap-4'>
            {state.pin.map((value, index) => (
              <TouchableOpacity className='rounded-md rounded-full' key={index}>
                <TextInput
                  style={{ height:20, width: 23}}
                  className={`${value !== '' ? 'bg-primary': 'bg-white'} border-2 border-primary rounded-full`}
                  value={value}
                  onKeyPress={({nativeEvent}) => textInputOnKeyPress(nativeEvent, index)}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={(el) => (inputs.current[index] = el)} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className='absolute self-center bottom-8 w-full items-center justify-center'>
          <TouchableOpacity className='w-full bg-primary w-full p-4 rounded-xl' onPress={handleConfirm}>
            <Text className='text-center text-white font-bold text-lg'>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LinkMPIN;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
      overflow:'visible',
      
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 60
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
