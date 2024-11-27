import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterOTP = ({ route }) => {
  const { mobileNumber, otp: backendOtp, isLogin, setMPIN } = route.params || {};
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);
  const navigation = useNavigation();

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const textInputOnKeyPress = (nativeEvent, index) => {
    if (nativeEvent.key === "Backspace" && index > 0) {
      inputs.current[index].clear(); 
      inputs.current[index - 1].focus(); 
    }
  };

  const handleResend = () => {
    alert("Resend Code clicked!");
  };

  const handleNext = () => {
    const enteredOtp = otp.join(""); 

    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    if (enteredOtp === backendOtp.toString()) {
      if (isLogin) {
        navigation.navigate("Dashboard", {
          formData: {
            first_name: "John",
            middle_name: "Sample",
            last_name: "Doe",
            birthdate: new Date(),
            email: "johndoe@gmail.com",
            nationality: "Nationality",
            main_source: "Main Source of Funds",
            province: "Province",
            city: "City/Municipality",
            barangay: "Barangay",
            zipcode: "ZipCode",
            HasNoMiddleName: false,
          },
        });
      } else {
        navigation.navigate("OpenAccount", { mobileNumber });
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.otpContainer} className="px-4">
          {otp.map((value, index) => (
            <TouchableOpacity key={index} className="rounded-md" style={styles.shadow}>
              <TextInput
                className="border border-primary h-14 w-12 p-4 text-lg rounded-md"
                value={value}
                onKeyPress={({ nativeEvent }) => textInputOnKeyPress(nativeEvent, index)}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={(el) => (inputs.current[index] = el)}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleResend}>
          <Text className="text-sm text-center text-primary">
            Didn't get the code? <Text className="font-bold">Resend Code</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View className="px-12">
        <TouchableOpacity className="w-full bg-primary p-4 rounded-xl" onPress={handleNext}>
          <Text className="text-center text-white font-bold text-lg">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterOTP;

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
  subHeaderText: {
    fontSize: 16,
    color: "#555",
  },
  blueText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    width: 50,
    height: 50,
  },
  resendText: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
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
});
