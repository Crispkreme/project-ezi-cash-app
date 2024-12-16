import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { __gstyles__ } from "../globalStylesheet";
import NavigationBar from "../components/NavigationBar";

const Dashboard = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();
  const handleConfirm = async () => {
    navigator.navigate("SetMPIN");
  };
  
  const handleNext = (service) => {
    console.log("service", service);
    navigator.navigate("EWallet", { formData: { ...formData, service: service } });
  };

  const viewProfile = () => {
    navigator.navigate("Profile", {formData});
  }
  return (
    <View style={styles.container}>
      
      <ScrollView>
        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Services</Text>
        </View>
        <TouchableOpacity
          style={__gstyles__.shadow}
          className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300'
          onPress={() => handleNext("Cash In")}
        >
          <View className='flex-row justify-center items-center p-2 px-4 gap-4 w-full'>
            <Image alt="cash in" source={require("../../public/icn/cash-in-icn.png")}></Image>
            <View>
              <Text className='font-semibold text-lg text-primary'>Cash In</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={__gstyles__.shadow}
          className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300'
          onPress={() => handleNext("Cash Out")}
        >
          <View className='flex-row justify-center items-center p-2 px-4 gap-4 w-full'>
            <Image alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <View>
              <Text className='font-semibold text-lg text-primary'>Cash Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <NavigationBar formData={formData} partnerType={formData.partnerType}/>
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
