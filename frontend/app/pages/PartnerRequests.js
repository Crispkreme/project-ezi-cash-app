import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Modal, Pressable } from "react-native";
import { __gstyles__ } from "../globalStylesheet";
import { socket } from "./Main";

const PartnerRequests = ({ route, navigation }) => {
  
  const { formData } = route.params;
  const wLabels = {...formData};
  const navigator = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [todayTransactions, setTodayTransactions] = useState([]);
  const [yesterdayTransactions, setYesterdayTransactions] = useState([]);

  const viewProfile = () => {
    navigator.navigate("ProfileProfile", {formData});
  }
  const viewDashboard = () => {
    navigator.navigate("PartnerDashboard", {formData});
  }
  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }
  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }
  const acceptRequest = async (transaction) => {
    try {
      setTransactionData(transaction);
      setIsModalVisible((prev) => !prev);
      console.log("transaction", transaction);
  
      if (!formData?.user_detail_id) {
        throw new Error("Partner ID is missing in formData.");
      }
  
      const payload = {
        individual_id: transaction.user_detail_id,
        partner_id: formData.user_detail_id,
        transaction_id: transaction.id,
        transaction_status: "Approved",
        approved_at: new Date().toISOString(),
      };
  
      const response = await fetch(`${process.env.base_url}/approve-cash-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Transaction approved successfully.");
        socket.emit('approve-request', 'hello world');
        console.log(data.message);

        navigator.navigate("ApprovedRequest", {
          formData,
          transaction
        });

      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(errorData.message || "Failed to approve the transaction.");
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      alert("Error connecting to the server. Please check your network.");
    }
  };
  
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`${process.env.base_url}/get-request`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const responseText = await response.text();
          alert('Error', `Server returned: ${responseText}`);
          return;
        }

        const parsedResponse = await response.json();

        if (parsedResponse.data && Array.isArray(parsedResponse.data)) {
          console.log(parsedResponse);
          setTransactions(parsedResponse.data);
        } else {
          setTransactions([]);
          alert('No transactions found.');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        alert('Error', 'An error occurred while fetching transactions.');
      }
    };

    fetchTransaction();
  }, []);
  const groupTransactionsByDate = (transactions) => {
    if (!transactions || transactions.length === 0) return {};

    const grouped = {};
    const today = new Date().toDateString();

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date).toDateString();
      const groupKey = transactionDate === today ? 'Today' : transactionDate;

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(transaction);
    });
    return grouped;
  };
  const groupedTransactions = groupTransactionsByDate(transactions) || {};

  const handleConfirm = async (transactionDetails, formData) => {
    
    const payload = {
      individual_id: transactionDetails.user_detail_id,
      partner_id: formData.user_detail_id,
      transaction_id: transactionDetails.id,
      transaction_status: "Approved",
      approved_at: new Date().toISOString(),
    };
    
    try {
      const response = await fetch(`${process.env.base_url}/approve-cash-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setIsModalVisible(false);
        alert("Request approved successfully.");  
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(errorData.message || "Failed to approve the payment request. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to approve the payment request. Please check your connection and try again.");
    }
  };

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

          <View style={{ flexDirection: "row" }} className="gap-8 mb-8">
            {Object.entries(groupedTransactions).map(([groupKey, transactionGroups]) => (
              <View key={groupKey}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Text
                    style={{ maxWidth: 300 }}
                    className="text-gray-400 font-semibold text-xl"
                  >
                    {groupKey}
                  </Text>
                </View>
                {transactionGroups.map((transaction) => {
                  const transactionIcon =
                    transaction.service === 'Cash In'
                      ? require('../../public/icn/cashin.png')
                      : require('../../public/icn/cashout.png');

                  return (
                    <TouchableOpacity
                      key={transaction.id}
                      style={[
                        __gstyles__.shadow,
                        { justifyContent: "space-between", width: "100%" },
                      ]}
                      className="flex-row p-2 rounded-full py-4 px-4 mb-2"
                      // onPress={() => viewServiceManagement(transaction)}
                    >
                      <View className="flex-row items-center">
                        <Image source={transactionIcon} />
                        <Text>
                          <Text style={{ width: 50 }} className="text-base text-ellipsis overflow-hidden w-10">{transaction.name} {"\n"}</Text>
                          <Text className="text-xs">{transaction.service}</Text>
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row" }}>
                        <Text>
                          <Text className="text-lg font-bold text-right">
                            {transaction.amount} {"\n"}
                          </Text>
                          <Text className="text-xs">
                            {transaction.bank || "Paypal"} {"\n"}
                          </Text>
                          <Text className="text-xs">
                            {new Date(transaction.date).toLocaleString()} {"\n"}
                          </Text>
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => acceptRequest(transaction)}
                            style={__gstyles__.shadow}
                            className="p-2 rounded-full"
                          >
                            <Image source={require("../../public/icn/accept.png")} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => rejectRequest(transaction)}
                            style={__gstyles__.shadow}
                            className="p-2 rounded-full"
                          >
                            <Image source={require("../../public/icn/reject.png")} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
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
                  <Pressable
                    style={{ maxWidth: 100 }}
                    className="w-full bg-primary rounded-lg"
                    onPress={() => handleConfirm(transactionData, formData)}
                  >
                    <Text className="p-4 text-center text-white font-bold">Ok</Text>
                  </Pressable>
                  <Pressable
                    style={{ maxWidth: 100 }}
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