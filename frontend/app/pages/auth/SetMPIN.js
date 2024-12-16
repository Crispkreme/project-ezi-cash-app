import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { __gstyles__ } from "../../globalStylesheet";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

const SetMPIN = ({ route, navigation }) => {

  const { formData, isReset } = route.params;
  const navigator = useNavigation();

  const [state, setState] = useState({
    mpin: "",
    mpinShow: false,
    confirmMpin: "",
    confirmMpinShow: false,
    accepted: false,
  });

  const handleConfirm = async () => {
    if(!state.accepted) {
      alert("Please read and accept the Terms and Conditions");
      return;
    }

    if(state.mpin === "" && state.confirmMpin === "") {
      alert("Please input your MPIN!");
      return;
    }

    if(state.mpin !== state.confirmMpin) {
      alert("MPIN does not match!");
      return;
    }

    if(isReset) {
      navigator.navigate("ResetMPINSuccessful", {formData});
    } else {
      console.log(formData);

      const status = await fetch(process.env.base_url + '/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({...formData, MPIN: state.mpin})
      }).then();

      const body = await status.json();

      if(status.status !== 201) alert(body.message);

      console.log(body.data);

      navigator.navigate("Dashboard", {formData: body.data});
    }
    
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const toggleTermsAndConditions = () => {
    setState((prev) => ({...prev, accepted: !prev.accepted}));
  };

  const handleBack = () => {

  }

  return (
    <ImageBackground style={{flex: 1}} source={require("../../../public/image/bg.png")}>
      <View style={{paddingVertical: 60}} className='flex-row items-center'>
        <TouchableOpacity onPress={handleBack} className='absolute left-6'>
          <Image style={styles.back} source={require("../../../public/image/back.png")}/>
        </TouchableOpacity>
        <Text className='text-white text-center w-full text-2xl'>{isReset ? "Account Recovery" : "Register"}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Set MPIN</Text>
          <Text className='text-gray-400'>MPIN serves as a password for eZiCash. Never share your MPIN to anyone.</Text>
        </View>
        
        <Text className='text-sm text-gray-400 mb-2 mt-8'>Enter a 4-digit MPIN</Text>
        <TouchableOpacity style={__gstyles__.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            letterSpacing={state.mpinShow || state.mpin.length === 0 ? 0 : 5}
            placeholder="Enter MPIN"
            keyboardType='numeric'
            value={state.mpin}
            maxLength={4}
            secureTextEntry
            onChangeText={(value) => handleInputChange("mpin", value)}
          />
        </TouchableOpacity>

        <Text className='text-sm text-gray-400 mb-2 mt-4'>Confirm MPIN</Text>
        <TouchableOpacity style={__gstyles__.shadow} className='rounded-md mb-2'>
          <TextInput
            className='border border-gray-300 rounded-md p-4 bg-white'
            placeholder="Confirm MPIN"
            keyboardType='numeric'
            letterSpacing={state.confirmMpinShow || state.confirmMpin.length === 0 ? 0 : 5}
            value={state.confirmMpin}
            maxLength={4}
            secureTextEntry
            onChangeText={(value) => handleInputChange("confirmMpin", value)}
          />
        </TouchableOpacity>

        <View className='py-4 mx-auto self-center absolute bottom-4'>
          <View className='flex-row gap-2 pl-4 justify-center'>
            <TouchableOpacity
              style={[__gstyles__.checkbox, state.accepted && __gstyles__.checked]}
              onPress={toggleTermsAndConditions}
            >
              {state.accepted && <Text style={__gstyles__.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text className='text-gray-400 mb-2 text-center text-sm'>I agree to the <Text className='text-primary font-semibold'>Terms and Conditions</Text></Text>
          </View>
          <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
            <Text className='font-bold text-white text-center'>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SetMPIN;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', borderTopStartRadius: 20, borderTopEndRadius: 20},
  key: {color: '#6b7280'},
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  label: { fontWeight: "bold" },
  value: { color: "#555" },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
