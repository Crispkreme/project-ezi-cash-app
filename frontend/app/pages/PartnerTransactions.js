import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import { __gstyles__ } from "../globalStylesheet";

const PartnerTransactions = ({ route, navigation }) => {

  const { formData } = route.params;
  const wLabels = {...formData};
  const navigator = useNavigation();
  const [allTransaction, setAllTransaction] = useState([]);
  const [allRating, setAllRating ] = useState([]);
  const [allSuccessTransaction, setAllSuccessTransaction ] = useState([]);
  const [allFailedTransaction, setAllFailedTransaction ] = useState([]);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const handleConfirm = async () => {
    navigator.navigate("SetMPIN");
  };
  const handleNext = () => {
    navigator.navigate("EWallet", {formData});
  };
  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }
  const viewProfile = () => {
    navigator.navigate("ProfileProfile", {formData});
  }
  const viewDashboard = () => {
    navigator.navigate("PartnerDashboard", {formData});
  }
  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }
  const viewCommissionFeeStatements = () => {
    navigator.navigate("PartnerCommissionFeeStatements", {formData});
  }

  const fetchAllTransactions = async () => {
    try {
      const response = await fetch(
        `${process.env.base_url}/get-total-transaction/${formData?.user_detail_id || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
  
      if (Array.isArray(data) && data.length > 0) {
        setAllTransaction(data[0]);
      } else {
        console.warn("No transactions found");
        setAllTransaction({});
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("An error occurred while fetching transactions.");
    }
  };
  const fetchStoreRating = async () => {
    try {
      const response = await fetch(
        `${process.env.base_url}/get-store-rating/${formData?.user_detail_id || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setAllRating(data[0]);
      } else {
        console.warn("No transactions found");
        setAllRating({});
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("An error occurred while fetching transactions.");
    }
  };
  const fetchCountSuccessTransaction = async () => {
    try {
      const response = await fetch(
        `${process.env.base_url}/get-all-success-transaction/${formData?.user_detail_id || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setAllSuccessTransaction(data[0]);
      } else {
        console.warn("No transactions found");
        setAllSuccessTransaction({});
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("An error occurred while fetching transactions.");
    }
  };
  const fetchCountFailedTransaction = async () => {
    try {
      const response = await fetch(
        `${process.env.base_url}/get-all-failed-transaction/${formData?.user_detail_id || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setAllFailedTransaction(data[0]);
      } else {
        console.warn("No transactions found");
        setAllFailedTransaction({});
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("An error occurred while fetching transactions.");
    }
  };

  useEffect(() => {
    fetchAllTransactions();
    fetchStoreRating();
    fetchCountFailedTransaction();
    fetchCountSuccessTransaction();
  }, []);

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
              {formData.name}
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
              <Text style={{fontSize: 28}} className='text-primary p-4 text-center font-bold'>{allSuccessTransaction.success_count || 0}</Text>
              <Text className='text-gray-400 text-xs'>
                Total number of Success Service
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='p-2 rounded-xl border border-primary'>
              <Text style={{fontSize: 28}} className='text-primary p-4 text-center font-bold'>{allFailedTransaction.failed_count || 0}</Text>
              <Text className='text-gray-400 text-xs'>
                Canceled Services
              </Text>
            </TouchableOpacity>
          </View>

          {/* Earnings */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Earnings</Text>
            <TouchableOpacity style={__gstyles__.shadow}>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-6 py-2'>{currentMonth}</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}} className='gap-2 mb-8'>
            <TouchableOpacity style={[__gstyles__.shadow, {maxWidth: 105, width: 105}]} className='px-2 py-4 rounded-xl border border-primary justify-between'>
              <Text className='text-primary text-base p-2 text-center'>₱ {allTransaction?.earnings || "0.00"}</Text>
              <Text className='text-gray-400 text-xs text-right'>
                Paypal
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
              <Text className='text-primary text-base p-2 text-center'>₱ {allTransaction?.earnings || "0.00"}</Text>
            </TouchableOpacity>
          </View>

          {/* Commission Fees */}
          <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}]}>
            <Text style={{maxWidth: 300}} className=' text-primary font-semibold text-xl'>Commission Fees</Text>
            <TouchableOpacity style={__gstyles__.shadow}>
              <Text style={{maxWidth: 300}} className='  text-primary font-semibold text-sm px-6 py-2'>{currentMonth}</Text>
            </TouchableOpacity>
          </View>

          <View className='gap-2 mb-8'>
            <TouchableOpacity onPress={viewCommissionFeeStatements} style={[__gstyles__.shadow]} className='px-2 py-4 rounded-xl border border-primary'>
              <Text className='text-primary text-2xl p-2 text-center'>₱ {allTransaction?.comission || "0.00"}</Text>
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
                <Text className='text-primary text-2xl p-2 text-center'> {allRating.overall_rating || 0}</Text>
                <Text className='text-primary text-base p-2 text-center'> Avg. Customer Ratings</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          
          <View style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
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
