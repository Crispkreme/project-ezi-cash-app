import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import { __gstyles__ } from "../globalStylesheet";

const PartnerRequests = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const handleConfirm = async () => {
    navigator.navigate("SetMPIN");
  };
  
  const handleNext = () => {
    navigator.navigate("EWallet", {formData});
  };

  const viewProfile = () => {
    navigator.navigate("Profile", {formData});
  }

  return (
    <ImageBackground style={{flex: 1}} source={require("../../public/image/background.png")}>
      <View>
        <View style={[styles.header]} className={`flex-row items-center justify-between p-8`}>
            
          <Text className='self-start mt-24'>
            <Text style={styles.text} className='z-50 text-white font-bold'>
              <Text style={{fontSize: 26}}>Requests{"\n"}</Text>
            </Text>
          </Text>

          
          <Image source={require("../../public/icn/notification-icn.png")}/>
        </View>
        
      </View>


      <View style={[styles.container, {borderTopStartRadius: 20, borderTopEndRadius: 20}]}>
        <ScrollView>
          <View style={[styles.header, {flexDirection: 'row'}]}>
            <Text style={{maxWidth: 300, marginRight: 20}} className=' text-primary font-semibold underline text-xl'>Cash In</Text>
            <Text style={{maxWidth: 300}} className=' text-gray-600 font-semibold text-xl'>Cash Out</Text>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-8 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row'>
                <Image source={require("../../public/icn/cashin.png")}/>
                <Text>
                  <Text className='text-base'>Honey Recla {"\n"}</Text>
                  <Text className='text-xs'>Cash In</Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Text className='text-lg font-bold'>530.00 {"\n"}</Text>
                  <Text className='text-xs '>       Paypal</Text>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                  <TouchableOpacity style={__gstyles__.shadow} className='p-2 rounded-full'>
                    <Image source={require("../../public/icn/accept.png")}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={__gstyles__.shadow} className='p-2 rounded-full'>
                    <Image source={require("../../public/icn/reject.png")}/>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          
          <View style={styles.footerBtnContainer} className='relative' onPress={handleConfirm}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </View>

          <View style={styles.footerBtnContainer} className='flex-start'  onPress={handleConfirm}>
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </View>

          <View style={styles.footerBtnContainer} onPress={handleConfirm}>
            <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Requests</Text>
          </View>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={viewProfile}>
            <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PartnerRequests;

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
