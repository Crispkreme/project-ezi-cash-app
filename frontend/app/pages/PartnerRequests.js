import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Modal, Pressable } from "react-native";
import { __gstyles__ } from "../globalStylesheet";

const PartnerRequests = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const handleConfirm = async (service, payment) => {
    navigator.navigate("PartnerLocate", {formData,payment: payment, partner: {...formData, legal_name: `${formData.first_name} ${formData.middle_name} ${formData.last_name}`}});
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const acceptRequest = () => setIsModalVisible(prev => !prev);


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
                  <TouchableOpacity onPress={acceptRequest} style={__gstyles__.shadow} className='p-2 rounded-full'>
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
          
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start' onPress={viewTransactions}>
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

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay} className="px-4">
              <View className="w-full bg-white p-4 rounded-md items-center gap-4">
                <Text className="font-bold text-base">Are you sure you want to approve this request?</Text>

                <View className="gap-4 flex-row px-4 mb-4">
                  <Pressable style={{maxWidth: 100}} className="w-full bg-primary rounded-lg" onPress={() => handleConfirm("Cash In", {type: "E-wallet", balance: 0, service: "Cash In", amount: 500, bank: "Paypal"})}>
                    <Text className="p-4 text-center text-white font-bold">Ok</Text>
                  </Pressable>
                  <Pressable
                    style={{maxWidth: 100}}
                    className="w-full p-4 border border-primary bg-white rounded-lg"
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text className="text-primary font-bold text-center">Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
