import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { __gstyles__ } from "../globalStylesheet";
import HighHeader from "../components/HighHeader";

const TransactionComplete = ({ route, navigation }) => {
  const { formData, transactionData } = route.params;

  // const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0,
    active: 0,
    accepted: false
  });

  if(formData.partner_type === "") {
    setTimeout(() => {
      navigator.navigate("RatePartner", {formData, transactionData});
    },3000);
  }

  return (
    <View style={{flex: 1}}>
      <View className='items-center'>
        <HighHeader title="Transaction Completed!" position="low" />
      </View>
      <View style={styles.container}>
        <View style={[__gstyles__.shadow, styles.card]} className='absolute w-full bg-primary-bg px-4 py-2 rounded-lg mb-4 border border-gray-300'>
          <View style={styles.header} className=' gap-2 w-full py-4 items-center justify-center self-center'>
            <Text className='text-primary inline font-semibold text-xl'>Sent</Text>
            <Text className='text-primary inline text-sm'>Via Paypal</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>eZiCash Partner</Text>
              </View>
            </View>
            <View style={{justifyContent:'flex-end', alignItems: 'flex-end'}}>
              <Text className='text-sm'>{formData.name}</Text>
            </View>
          </View>
          
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Service</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{transactionData.service}</Text>
          </View>

          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='text-gray-400 text-base'>Amount</Text>
              </View>
            </View>
            <Text className='text-gray-400 text-base text-primary'>{parseInt(transactionData.amount).toFixed(2)}</Text>
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
            <Text className='text-gray-400 text-base text-primary'>15.00</Text>
          </View>
        </View>

      </View>
    </View>
  );
};

export default TransactionComplete;

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
