import React, { useState, useRef, useEffect } from "react";
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
  const { mobileNumber, otp: backendOtp, isLogin, setMPIN, formData } = route.params || {};
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeRemaining, setTimeRemaining] = useState(2 * 60);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [backendOtpState, setBackendOtp] = useState(backendOtp);
  const inputs = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsOtpExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const textInputOnKeyPress = (nativeEvent, index) => {
    if (nativeEvent.key === "Backspace" && index > 0) {
      inputs.current[index].clear();
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (isOtpExpired) {
      const response = await fetch(process.env.base_url + "/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setBackendOtp(data.otp);
        setOtp(Array(6).fill(""));
        setTimeRemaining(2 * 60); 
        setIsOtpExpired(false); 
        console.log("New OTP generated:", data.otp);
      } else {
        alert("Failed to resend OTP. Please try again.");
      }
    }
  };

  const handleNext = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    if (enteredOtp === backendOtpState.toString()) {
      if (isLogin && formData.partner_type === "") {
        navigation.navigate("Dashboard", {formData});
      } else if(isLogin && formData.partner_type !== "") {
        navigation.navigate("PartnerDashboard", {formData});
      } else {
        navigation.navigate("OpenAccount", { mobileNumber });
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text className="text-sm text-center">
            {isOtpExpired ? "OTP has expired." : `OTP valid for: ${formatTime(timeRemaining)}`}
          </Text>
        </View>

        {/* Resend OTP Button */}
        <TouchableOpacity 
          onPress={handleResend}
          style={[styles.resendButton, isOtpExpired ? styles.resendButtonActive : styles.resendButtonInactive]}
          disabled={!isOtpExpired} 
        >
          <Text className="text-sm text-center text-primary">
            {isOtpExpired ? "OTP Expired. Request a new one." : "Didn't get the code? Resend Code"}
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
  scrollContainer: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  resendButton: {
    marginTop: 20,
    textAlign: "center",
  },
  resendButtonInactive: {
    opacity: 0.5,
  },
  resendButtonActive: {
    opacity: 1,
  },
  timerContainer: {
    marginTop: 10,
  },
});

export default RegisterOTP;