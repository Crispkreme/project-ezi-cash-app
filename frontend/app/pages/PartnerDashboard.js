import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import { __gstyles__ } from "../globalStylesheet";

const PartnerDashboard = ({ route, navigation }) => {
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

  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }

  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }

  const viewCommissionFeeStatements = () => {
    navigator.navigate("PartnerCommissionFeeStatements", {formData});
  }

  return (
    <ImageBackground style={{flex: 1}} source={require("../../public/image/background.png")}>
      <View>
        <View style={[styles.header]} className={`flex-row items-center justify-between p-8`}>
            
          <Text className='self-start mt-24'>
            <Text className="text-white">{new Date().toDateString()} {"\n"}</Text>
            <Text style={styles.text} className='z-50 text-white font-bold'>
              <Text style={{fontSize: 26}}>Hi eZiCash Partner,{"\n"}</Text>
            </Text>
            <Text style={{fontSize: 20}} className=' mt-1 text-white'>
              {formData.first_name} {formData.middle_name} {formData.last_name}
            </Text>
          </Text>

          
          <Image source={require("../../public/icn/notification-icn.png")}/>
        </View>
        
      </View>


      <View style={[styles.container, {borderTopStartRadius: 20, borderTopEndRadius: 20}]}>
        <ScrollView>
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Analytics</Text>
            <TouchableOpacity style={__gstyles__.shadow}>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-6 py-2'>Monthly</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-8 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='p-2 rounded-xl border border-primary'>
              <Text style={{fontSize: 28}} className='text-primary p-4 text-center font-bold'>20</Text>
              <Text className='text-gray-400 text-xs'>
                Total number of Success Service
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='p-2 rounded-xl border border-primary'>
              <Text style={{fontSize: 28}} className='text-primary p-4 text-center font-bold'>2</Text>
              <Text className='text-gray-400 text-xs'>
                Canceled Services
              </Text>
            </TouchableOpacity>
          </View>

          {/* Earnings */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Earnings</Text>
            <TouchableOpacity style={__gstyles__.shadow}>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-6 py-2'>May</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-2 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='px-2 py-4 rounded-xl border border-primary justify-between'>
              <Text className='text-primary text-base p-2 text-center'>₱4050.00</Text>
              <Text className='text-gray-400 text-xs text-right'>
                E-Wallet
                <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='px-2 py-4 rounded-xl border border-primary justify-between'>
              <Text className='text-primary text-base p-2 text-center'>₱4050.00</Text>
              <Text className='text-gray-400 text-xs text-right'>
                E-Wallet
                <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='px-2 py-4 rounded-xl border border-primary justify-between'>
              <Text className='text-primary text-base p-2 text-center'>₱4050.00</Text>
              <Text className='text-gray-400 text-xs text-right'>
                E-Wallet
                <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Total Earnings */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Total Earnings</Text>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-2 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 150, width: 150}]} className='px-2 py-4 rounded-xl border border-primary justify-between'>
              <Text className='text-primary text-base p-2 text-center'>₱ 5800.00</Text>
            </TouchableOpacity>
          </View>

          {/* Commission Fees */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Commission Fees</Text>
            <TouchableOpacity style={__gstyles__.shadow}>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-6 py-2'>May</Text>
            </TouchableOpacity>
          </View>

          <View className='gap-2 mb-8'>
            <TouchableOpacity onPress={viewCommissionFeeStatements} style={[__gstyles__.shadow]} className='px-2 py-4 rounded-xl border border-primary'>
              <Text className='text-primary text-2xl p-2 text-center'>₱ 5800.00</Text>
            </TouchableOpacity>
          </View>

          {/* Reviews */}

          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Reviews</Text>
          </View>

          <View className='gap-2 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow]} className='px-2 py-4 rounded-xl border border-primary'>
              <Text className='text-primary text-2xl p-2 text-center'>
                <Text><Rating imageSize={20} type='custom' ratingColor="white" startingValue={2} ratingImage={require("../../public/icn/star-icn.png")} ratingCount={1}/></Text>
                <Text className='text-primary text-2xl p-2 text-center'> 4.7</Text>
                <Text className='text-primary text-base p-2 text-center'> Avg. Customer Ratings</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          
          <View style={styles.footerBtnContainer} className='relative' onPress={handleConfirm}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </View>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={viewTransactions}>
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </TouchableOpacity>

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

export default PartnerDashboard;

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