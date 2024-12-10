import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Switch } from "react-native";
import { __gstyles__ } from "../globalStylesheet";
import BusinessHour from "../components/BusinessHour";

const PartnerServiceManagement = ({ route, navigation }) => {
  const { formData } = route.params;
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState(0);
  const wLabels = {...formData};
  const navigator = useNavigation();

  const toggleCashIn = () => setService(prev => ({...prev, cashIn: !prev.cashIn}));
  const toggleCashOut = () => setService(prev => ({...prev, cashOut: !prev.cashOut}));
  const acceptRequest = () => setIsModalVisible(prev => !prev);
  const [edit, setEdit] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirm = async (service, payment) => {
    navigator.navigate("PartnerLocate", {formData,payment: payment, partner: {...formData, legal_name: `${formData.first_name} ${formData.middle_name} ${formData.last_name}`}});
  };
  const handleNext = () => {
    navigator.navigate("EWallet", {formData});
  };
  const viewProfile = () => {
    navigator.navigate("Profile", {formData});
  }
  const viewDashboard = () => {
    navigator.navigate("PartnerDashboard", {formData});
  }
  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }
  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }
  const [service, setService] = useState({
    cashIn: false,
    cashOut: false
  });
  const fetchWallet = async () => {
    if (!formData.user_detail_id) {
      Alert.alert('Error', 'User detail ID is missing.');
      return;
    }

    try {
      const response = await fetch(`${process.env.base_url}/get-wallet/${formData.user_detail_id}`);
      if (!response.ok) {
        const responseText = await response.text();
        Alert.alert('Server Error', `Server returned: ${responseText}`);
        return;
      }

      const parsedResponse = await response.json();
      if (parsedResponse.data && parsedResponse.data.length > 0) {
        const wallet = parsedResponse.data[0];
        setWallets(parsedResponse.data);
        setBalance(wallet.balance);
        setService(prev => ({
          ...prev,
          cashIn: wallet.cashInEnabled,
          cashOut: wallet.cashOutEnabled,
        }));
      } else {
        alert('Error', 'No wallet found.');
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      alert('Error', 'An error occurred while fetching wallet.');
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [formData]);

  return (
    <ImageBackground style={{flex: 1}} source={require("../../public/image/background.png")}>
      <View>
        <View style={[styles.header]} className={`flex-row items-center justify-between p-8`}>
          <Text className='self-start mt-24'>
            <Text style={styles.text} className='z-50 text-white font-bold'>
              <Text style={{fontSize: 26}}>Service Management{"\n"}</Text>
            </Text>
          </Text>
          <Image source={require("../../public/icn/notification-icn.png")}/>
        </View>
      </View>
      <View style={[styles.container, {borderTopStartRadius: 100}]}>
        <ScrollView style={{marginTop: 50}}>
          <View style={[styles.header, {flexDirection: 'row'}]}>
            <Text style={{maxWidth: 300, marginRight: 20}} className=' text-primary font-semibold text-xl'>Services</Text>
          </View>
          <View style={{flexDirection: 'row'}} className='gap-8 mb-4'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row'>
                <Image source={require("../../public/icn/cashin.png")}/>
                <Text>
                  <Text className='text-base'>Cash In {"\n"}</Text>
                  <Text className='text-xs'>Available Money: <Text className='text-primary font-bold'>{balance}</Text></Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    ios_backgroundColor="#3e3e3e"
                    thumbColor={service.cashIn ? '#00113f' : '#f4f3f4'}
                    onValueChange={toggleCashIn}
                    value={service.cashIn}
                  >
                  </Switch>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                  <TouchableOpacity onPress={acceptRequest} style={__gstyles__.shadow} className='p-2 px-4 rounded-2xl'>
                    <Text className='text-xs text-primary'>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}} className='gap-8 mb-4'>
            <TouchableOpacity style={[__gstyles__.shadow,{justifyContent: 'space-between', width: '100%'}]} className='flex-row p-2 rounded-full py-4 px-4'>
              <View className='flex-row'>
                <Image source={require("../../public/icn/cashout.png")}/>
                <Text>
                  <Text className='text-base'>Cash Out {"\n"}</Text>
                  <Text className='text-xs'>Available Money: <Text className='text-primary font-bold'>0.00</Text></Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    ios_backgroundColor="#3e3e3e"
                    thumbColor={service.cashOut ? '#00113f' : '#f4f3f4'}
                    onValueChange={toggleCashOut}
                    value={service.cashOut}
                  >
                  </Switch>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                  <TouchableOpacity onPress={acceptRequest} style={__gstyles__.shadow} className='p-2 px-4 rounded-2xl'>
                    <Text className='text-xs text-primary'>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.header, {flexDirection: 'row'}]}>
            <Text style={{maxWidth: 300, marginRight: 20}} className=' text-primary font-semibold text-xl'>Business Hours</Text>
          </View>

          <BusinessHour formData={formData} />

        </ScrollView>
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start' onPress={viewTransactions} >
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtnContainer} onPress={viewRequests}>
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

export default PartnerServiceManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
