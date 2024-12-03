import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import { __gstyles__ } from "../globalStylesheet";

const PartnerTransactions = ({ route, navigation }) => {
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

  return (
    <ImageBackground style={{flex: 1}} source={require("../../public/image/background.png")}>
      <View>
        <View style={[styles.header]} className={`flex-row items-center justify-between p-8`}>
            
          <Text className='self-start mt-24'>
            <Text style={styles.text} className='z-50 text-white font-bold'>
              <Text style={{fontSize: 26}}>Hi eZiCash Partner,{"\n"}</Text>
            </Text>
            <Text style={{fontSize: 20}} className=' mt-1 text-white'>
              {formData.first_name} {formData.middle_name} {formData.last_name}
            </Text>
          </Text>

          
          <Image source={require("../../public/icn/notification-icn.png")}/>
        </View>
        
        <View className={`flex-row items-start gap-4 p-8`}>
          <TouchableOpacity style={{maxWidth: 70}} >
            <View style={{width: 70, height: 70}} className='bg-white p-2 rounded-xl justify-center items-center'>
              <Image source={require("../../public/icn/service-management-icn.png")}/>
            </View>
            <Text className='text-white text-xs mt-4 font-bold'>Service {"\n"} Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{maxWidth: 70, }} >
            <View style={{width: 70, height: 70}} className='bg-white p-2 rounded-xl justify-center items-center'>
              <Image source={require("../../public/icn/analytics-icn.png")}/>
            </View>
            <Text className='text-white text-xs mt-4 font-bold'>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{maxWidth: 70}} >
            <View style={{width: 70, height: 70}} className='bg-white p-2 rounded-xl justify-center items-center'>
              <Image source={require("../../public/icn/service-management-icn.png")}/>
            </View>
            <Text className='text-white text-xs mt-4 font-bold'>Commission Fee Statements</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={[styles.container, {borderTopStartRadius: 20, borderTopEndRadius: 20}]}>
        <ScrollView>
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-6 py-2'>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Today Transactions */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-gray-400 font-semibold text-xl'>Today</Text>
          </View>

          <View style={{flexDirection: 'column'}} className='gap-2 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row items-center'>
                <Image source={require("../../public/icn/cashin.png")}/>
                <Text>
                  <Text className='text-base'>Honey Recla {"\n"}</Text>
                  <Text className='text-xs'>Cash In</Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Text className='text-lg font-bold text-right'>530.00 {"\n"}</Text>
                  <Text className='text-xs '>       Paypal  {"\n"}</Text>
                  <Text className='text-xs'>{new Date().toDateString()}  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row items-center'>
                <Image source={require("../../public/icn/cashout.png")}/>
                <Text>
                  <Text className='text-base'>Honey Recla {"\n"}</Text>
                  <Text className='text-xs'>Cash Out</Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Text className='text-lg font-bold text-right'>1000.00 {"\n"}</Text>
                  <Text className='text-xs '>       Paypal  {"\n"}</Text>
                  <Text className='text-xs'>{new Date().toDateString()}  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Yesterday Transactions */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-gray-400 font-semibold text-xl'>Yesterday</Text>
          </View>

          <View style={{flexDirection: 'column'}} className='gap-2 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row items-center'>
                <Image source={require("../../public/icn/cashin.png")}/>
                <Text>
                  <Text className='text-base'>Honey Recla {"\n"}</Text>
                  <Text className='text-xs'>Cash In</Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Text className='text-lg font-bold text-right'>530.00 {"\n"}</Text>
                  <Text className='text-xs '>       Paypal  {"\n"}</Text>
                  <Text className='text-xs'>{new Date().toDateString()}  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>

          <View style={styles.footerBtnContainer} className='flex-start'  onPress={handleConfirm}>
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

export default PartnerTransactions;

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
