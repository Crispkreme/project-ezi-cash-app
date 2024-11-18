import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { __gstyles__ } from "../globalStylesheet";

const Dashboard = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

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
    alert(5);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView>
        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Services</Text>
        </View>
        {/* Display form data */}
        <TouchableOpacity style={__gstyles__.shadow} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={handleNext}>
          <View className=' flex-row justify-center items-center p-2 px-4 gap-4 w-full'>
            <Image alt="cash in" source={require("../../public/icn/cash-in-icn.png")}></Image>
            <View>
              <Text className='font-semibold text-lg text-primary'>Cash In</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={__gstyles__.shadow} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={handleNext}>
          <View className='flex-row justify-center items-center p-2 px-4'>
            <Image alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <View>
              <Text className='font-semibold text-lg text-primary'>Cash Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer} className='py-2 flex-row gap-4'>
        
        <View className='relative' onPress={handleConfirm}>
          <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
        </View>

        <View  className='flex-start'  onPress={handleConfirm}>
          <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
        </View>

        <View className='flex-start'  onPress={handleConfirm}>
          <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
        </View>

        <View className='flex-start' onPress={handleConfirm}>
          <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
          <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Settings</Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

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
  buttonIcon: {
      marginLeft: 10,
  },
  footerBtnLabel : {
    maxWidth: 100
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
