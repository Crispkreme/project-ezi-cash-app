import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import { __gstyles__ } from "../globalStylesheet";

const PartnerCommissionFeeStatements = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const handleConfirm = async () => {
    navigator.navigate("SetMPIN");
  };
  
  const handleNext = () => {
    navigator.navigate("EWallet", {formData});
  };

  const viewDashboard = () => {
    navigator.navigate("PartnerDashboard", {formData});
  }

  const viewProfile = () => {
    navigator.navigate("Profile", {formData});
  }

  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }

  const viewSettledCommissions = () => {
    navigator.navigate("PartnerSettledCommissions", {formData});
  }

  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }

  return (
    <ImageBackground style={{flex: 1}} source={require("../../public/image/background.png")}>
      <View>
        <View style={[styles.header]} className={`flex-row items-center justify-between w-full`}>
            
          <Text className='self-center mt-24 w-full'>
            <Text style={styles.text} className='z-50 text-white font-bold text-center w-full'>
              <Text style={{fontSize: 23}}>Commission Fee Statements</Text>
            </Text>
          </Text>

          
          <Image className='absolute right-8' source={require("../../public/icn/notification-icn.png")}/>
        </View>
        
        <View className={` items-center justify-center p-8`}>
          <Text className='text-white text-xs'>Computed Commission Fee</Text>
          <Text style={{fontSize: 32}} className='text-white'>₱ 520.00</Text>
          <Text className='text-white text-xs'>Total Transaction Fee Earned ₱650.00</Text>
        </View>
      </View>


      <View style={[styles.container, {borderTopStartRadius: 20, borderTopEndRadius: 20}]}>
        <ScrollView>
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300, fontSize: 32}} className=' text-primary font-semibold'>₱ 520.00</Text>
            <TouchableOpacity style={__gstyles__.shadow}>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-4 py-2'>Pay</Text>
            </TouchableOpacity>
          </View>
          <Text>Due Date: <Text className='font-bold'>{new Date(new Date().setDate(new Date().getDate() + 6)).toDateString()}</Text></Text>

          {/* Today Transactions */}
          <View className='mt-4' style={[styles.header, {flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8}]}>
            <Image source={require("../../public/icn/commission-payment-dt-icn.png")}/>
            <Text className=' text-gray-400 font-semibold text-sm'>8 day to Commission Payment Date. Pay on time
            to avoid charges.</Text>
          </View>

          <View style={{flexDirection: 'column'}} className='gap-2 pt-8 mb-8'>
            <TouchableOpacity onPress={viewSettledCommissions} style={[__gstyles__.shadow,{ width: '100%'}]} className='flex-row items-center gap-8 p-2 rounded-full py-4 px-4'>
              <View className='flex-row items-center'>
                <Image source={require("../../public/icn/commission-fee-icn.png")}/>
              </View>
              <Text style={{fontSize: 16}} className='font-bold'>Settled Commission Fees</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>

          <View style={styles.footerBtnContainer} className='flex-start'  onPress={viewTransactions}>
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </View>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start' onPress={viewRequests}>
            <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={viewProfile}>
            <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PartnerCommissionFeeStatements;

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
