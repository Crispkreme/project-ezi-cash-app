import React, { useEffect, useState } from "react";
import {
  View,
  Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../public/svg/logo.jsx";
import DropdownComponent from "../components/DropdownComponent.js";
import {io} from 'socket.io-client';

export const socket = io(process.env.base_url);

const Main = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [zone, setZone] = useState("+63");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected!');
    });
  },[]);

  const handleNext = () => {
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    try {
      const check = await fetch(process.env.base_url + "/check-phone?phone=" + mobileNumber);
      
      if(check.status === 200) {
        const body = await check.json();
        if(body.data !== -1) {
          navigation.navigate("Login",{mobileNumber: body.data});
          return;
        }
      }
    } catch(e) {
      console.error(e);
      alert(e);
    }

    try {
      const response = await fetch(process.env.base_url + "/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber: "+63" + mobileNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        const otp = data.otp;

        alert("OTP sent successfully!");

        navigation.navigate("RegisterOTP", {
          mobileNumber,
          otp,
          isLogin: false,
          setMPIN: false,
        });
        
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to the server. Please check your network.");
    }
    setIsModalVisible(false);
  };

  return (
    <ImageBackground source={require("../../public/image/background.png")}>
      <View style={{marginVertical: 200, height: 620, borderTopLeftRadius: 150}} contentContainerStyle={{ flex: 1 }} className="flex flex-col justify-between items-center gap-4 h-full w-full p-4 bg-primary-bg">
        <View style={styles.head} className='justify-center mt-16 items-center'>
          <Logo />
          <Text style={styles.subHeaderText}>Enter mobile number to get started</Text>
        </View>

        <View style={[styles.scrollContainer, {flexDirection: 'row', alignItems: 'center', gap: 20}]} className="px-8 items-center">
          <Text>+63</Text>
          <TextInput
            className="p-4 border-b border-black mb-4 text-lg w-64"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            keyboardType='numeric'
            onChangeText={(text) => setMobileNumber(text)}
            maxLength={10}
          />
        </View>

        <View style={styles.footer} className="px-12">
          <TouchableOpacity className="w-full py-4 mb-4 bg-primary rounded-xl" onPress={handleNext}>
            <Text className="text-white font-semibold text-2xl text-center content-center">Next</Text>
          </TouchableOpacity>
        </View>

        <View className="px-8">
          <Text className="text-sm text-center">
            By tapping next, we will send you a One-Time Password (OTP) to your entered mobile number.
          </Text>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay} className="px-4">
            <View className="w-full bg-white p-4 rounded-md items-center gap-4">
              <Text className="font-bold text-base">Do you want to link this device to your account?</Text>
              <Text className="text-sm p-2">
                We need to perform a two-step authentication before linking this account to your device. We will send a
                6-digit code to your mobile number.
              </Text>

              <View className="gap-4 px-4 mb-4">
                <Pressable className="w-full bg-primary rounded-lg" onPress={handleConfirm}>
                  <Text className="p-4 text-center text-white font-bold">Send</Text>
                </Pressable>
                <Pressable
                  className="w-full p-4 border border-primary bg-white rounded-lg"
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text className="text-primary font-bold text-center">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  footer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  modalNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    flex: 1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  modalButtonPrimary: {
    backgroundColor: "#6200ea",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
