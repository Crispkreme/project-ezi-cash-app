import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = ({route}) => {

  const {mobileNumber} = route.params || {};
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({
    loggedNumber: mobileNumber ? mobileNumber : "9671234567",
    pin: Array(4).fill("")
  });

  const tempPin = "1234";

  const inputs = useRef([]);

  const getPin = async (phone, pin) => {
    const check = await fetch(process.env.base_url + "/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phone:phone ,pin: pin})
    });
    const body = await check.json();
    
    return body.data;
  }

  const handleChange = async (text, index) => {
    const newPin = [...state.pin];
    newPin[index] = text;
    setState(prev => ({...prev, pin: newPin}));

    if (text && index < state.pin.length - 1) {
      inputs.current[index + 1].focus();
    } else if(text && index === state.pin.length - 1) {
      const final = state.pin.join("") + text;
      
      const res = await getPin(state.loggedNumber, final);
      if(res === -1) {
        setIsModalVisible(true);
      } else {

        try {
          const otpResponse = await fetch(process.env.base_url + "/otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobileNumber: mobileNumber }),
          }); 

          if (otpResponse.ok) {
            const data = await otpResponse.json();
            const otp = data.otp;
            
            const smsResponse = await fetch(process.env.base_url + "/send-sms-otp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ mobileNumber: mobileNumber, otp: otp }),
            });
            
            const smsData = await smsResponse.json();
            console.log("SMS Response:", smsData);

            alert("OTP sent successfully!");
    
            navigation.navigate("RegisterOTP", {
              mobileNumber: state.loggedNumber,
              otp,
              isLogin: true,
              setMPIN: false,
              formData: res
            });
            
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        } catch (error) {
          console.error(error);
          alert("Error connecting to the server. Please check your network.");
        }
      }
    }

  };

  const changeNumber = () => {
    navigation.navigate("Main", { mobileNumber: state.loggedNumber, isLogin: true, setMPIN: false });
  }

  const resetMpin = () => {
    navigation.navigate("ResetMPIN", {isReset: true});
  }

  const textInputOnKeyPress = (nativeEvent, index) => {
    inputs.current[index].value = '';
    if(nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1].focus();
    }
  }

  return (
    <ImageBackground style={styles.container} source={require("../../public/image/background.png")}>
      <View className='p-2 bg-white rounded-lg'>
        <Image source={require("../../public/image/small-logo.png")}/>
      </View>
      <View>
        <TouchableOpacity onPress={changeNumber}>
          <Text className='px-4 py-2 bg-white text-primary rounded-full'>
            {"+63" + String(state.loggedNumber).substring(0, state.loggedNumber.length)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otpContainer} className=' gap-4'>
        {state.pin.map((value, index) => (
          <TouchableOpacity className='rounded-md rounded-full' key={index}>
            <TextInput
              style={{ height:20, width: 23}}
              className={`${value !== '' ? 'bg-white': 'bg-primary'} border border-white rounded-full`}
              value={value}
              keyboardType='numeric'
              onKeyPress={({nativeEvent}) => textInputOnKeyPress(nativeEvent, index)}
              onChangeText={(text) => handleChange(text, index)}
              maxLength={1}
              ref={(el) => (inputs.current[index] = el)} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay} className='px-4'>
          <View className='w-full bg-white p-4 rounded-md items-center gap-4'>
            <Text className='font-bold text-base'>Incorrect MPIN</Text>
            <Text  className='text-sm p-2'>You entered an incorrect MPIN. Please enter the correct MPIN or reset if you forgot.</Text>

            <View className='gap-4 px-4 mb-4'>
              <Pressable
                className='w-full bg-primary rounded-lg '
                onPress={resetMpin}
              >
                <Text className='p-4 text-center text-white font-bold'>Reset</Text>
              </Pressable>
              <Pressable className='w-full p-4 border border-primary bg-white rounded-lg' onPress={() => setIsModalVisible(false)}>
                <Text className='text-primary font-bold text-center'>Retry</Text>
              </Pressable>
              
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap:  100
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});