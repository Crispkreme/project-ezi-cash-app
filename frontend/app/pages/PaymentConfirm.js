import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { __gstyles__ } from "../globalStylesheet";
import HighHeader from "../components/HighHeader";

const PaymentConfirm = ({ route, navigation }) => {
  const { formData, partner, payment, key } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0,
    init: false,
    active: 0,
    accepted: false
  });

  useEffect(() => {
    if(!state.init) {
      setState(prev => ({...prev, init: true}));
    } else {

    }
  },[key]);

  const handleConfirm = async () => {
    navigator.navigate("WaitingApproval", {
      formData,
      partner,
      payment: {
        type: "E-wallet",
        balance: 0,
        service: "Cash In",
        amount: parseFloat(partner.amount).toFixed(2),
        total_amount: (parseFloat(partner.amount) + 15).toFixed(2),
        bank: "Paypal",
        store_id: partner.store_id,
        legal_name: partner.legal_name,
      },
    });
  };
  
  const handleNext = () => {
    navigator.navigate("Partner", { formData,  partner: {name: "Nicole Ayessa Alcover"}});
  };

  const toggleConfirmCheckbox = () => setState(prev => ({...prev, accepted: !prev.accepted}));

  return (
    <View style={{flex: 1}}>
      <View className='items-center'>
        <HighHeader title="Partner" position="mid" />
      </View>
      <View style={styles.container}>
        <View style={[__gstyles__.shadow, styles.card]} className='absolute w-full bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={styles.header} className=' gap-2 w-full py-8 items-center justify-center self-center'>
            <Text className='text-primary inline font-semibold text-xl'>{partner.legal_name}</Text>
            <Text className='text-primary inline text-sm'>{partner.address}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>E-wallet</Text>
              </View>
            </View>
            <View style={{justifyContent:'flex-end', alignItems: 'flex-end'}}>
              <View className='flex-row items-center gap-2'>
                <Image alt="cash in" source={require("../../public/icn/e-wallet-icn.png")}></Image>
                <Text className=' text-base text-primary'>{payment.bank}</Text>
              </View>
              <Text className=' text-base text-primary'>{parseInt(payment.balance).toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Service</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{payment.service}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Amount</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{parseFloat(payment.amount).toFixed(2)}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center py-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Transaction Fee</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>15.00</Text>
          </View>

          <View className='p-4'>
            <View
              className='m-4 border-gray-500'
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center py-2 pb-4 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Total Amount to Pay</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{(
              parseFloat(payment.amount) + parseFloat(15.0)).toFixed(2)}
            </Text>
          </View>
        </View>
        <View className='w-full absolute bottom-0'>
          <Text className='text-sm text-center mb-6'>
            Confirm Transaction will not be canceled. Please make 
            sure everything is correct.
          </Text>
          <View className='flex-row gap-2 justify-center'>
            <TouchableOpacity
              style={[__gstyles__.checkbox, state.accepted && __gstyles__.checked]}
              onPress={toggleConfirmCheckbox}
            >
              {state.accepted && <Text style={__gstyles__.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text className='text-primary mb-2 text-center text-sm'>I confirm that the details are accurate</Text>
          </View>
          <View className='py-8 mx-auto self-center w-full'>
            <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
              <Text className='font-bold text-white text-center w-full'>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentConfirm;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f9f9f9",
      overflow:'visible',
      justifyContent: 'center',
      alignItems: 'center'
  },

  card: {
    top: -80
  },
  header: {
      marginBottom: 20,
  },
  headerText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
