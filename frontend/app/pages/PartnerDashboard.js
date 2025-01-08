import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { __gstyles__ } from "../globalStylesheet";

const PartnerDashboard = ({ route, navigation }) => {
  const { formData } = route.params;
  
  const wLabels = {...formData};
  const navigator = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [todayTransactions, setTodayTransactions] = useState([]);
  const [yesterdayTransactions, setYesterdayTransactions] = useState([]);

  const handleConfirm = async () => {
    navigator.navigate("SetMPIN");
  };
  const handleNext = () => {
    navigator.navigate("EWallet", {formData});
  };
  const viewServiceManagement = (transaction) => {
    navigator.navigate("PartnerServiceManagement", { formData, transaction });
  };
  const viewCommissionFreeStatement = (transaction) => {
    navigator.navigate("PartnerCommissionFeeStatements", { formData });
  };
  const viewAnalytics = (transaction) => {
    navigator.navigate("PartnerTransactions", { formData, transaction });
  };
  const viewProfile = () => {
    navigator.navigate("PartnerProfile", {formData});
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

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`${process.env.base_url}/get-transaction`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const responseText = await response.text();
          alert("Error", `Server returned: ${responseText}`);
          return;
        }

        const parsedResponse = await response.json();

        if (parsedResponse.data && parsedResponse.data.length > 0) {
          setTransactions(parsedResponse.data);
        } else {
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
    const grouped = {};
    const today = new Date().toDateString();

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date).toDateString();
      const groupKey = transactionDate === today ? "Today" : transactionDate;

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(transaction);
    });
    return grouped;
  };
  const groupedTransactions = groupTransactionsByDate(transactions);

  const goToNotification = () => {
    navigator.navigate("Notification", {formData})
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
          <TouchableOpacity onPress={goToNotification}>
            <Image source={require("../../public/icn/notification-icn.png")}/>
          </TouchableOpacity>
        </View>
        
        <View className={`flex-row items-start gap-4 p-8`}>
          <TouchableOpacity onPress={viewServiceManagement} style={{maxWidth: 70}} >
            <View style={{width: 70, height: 70}} className='bg-white p-2 rounded-xl justify-center items-center'>
              <Image source={require("../../public/icn/service-management-icn.png")}/>
            </View>
            <Text className='text-white text-xs mt-4 font-bold'>Service {"\n"} Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{maxWidth: 70, }} onPress={viewAnalytics}>
            <View style={{width: 70, height: 70}} className='bg-white p-2 rounded-xl justify-center items-center'>
              <Image source={require("../../public/icn/analytics-icn.png")}/>
            </View>
            <Text className='text-white text-xs mt-4 font-bold'>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{maxWidth: 70}} onPress={viewCommissionFreeStatement}>
            <View style={{width: 70, height: 70}} className='bg-white p-2 rounded-xl justify-center items-center'>
              <Image source={require("../../public/icn/service-management-icn.png")}/>
            </View>
            <Text className='text-white text-xs mt-4 font-bold'>Commission Fee Statements</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.container, {borderTopStartRadius: 20, borderTopEndRadius: 20}]}>

        <ScrollView>
          <View
            style={[
              styles.header,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              },
            ]}
          >
            <Text
              style={{ maxWidth: 300 }}
              className="text-primary font-semibold text-xl"
            >
              Recent Transactions
            </Text>
            <TouchableOpacity>
              <Text
                style={{ maxWidth: 300 }}
                className="text-primary font-semibold text-sm px-6 py-2"
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {Object.entries(groupedTransactions).map(([groupKey, transactionGroups]) => (
            <View key={groupKey}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text style={{ maxWidth: 300 }} className="text-gray-400 font-semibold text-xl">
                  {groupKey}
                </Text>
              </View>

              {transactionGroups.map((group) => (
                <View key={group.date} style={{ flexDirection: "column" }} className="gap-2 mb-8">
                  {group.transactions.map((transaction) => {

                    const transactionIcon =
                    transaction.service === "Cash In"
                      ? require("../../public/icn/cashin.png")
                      : require("../../public/icn/cashout.png");

                    return(
                      <TouchableOpacity
                        key={`${transaction.id}-${transaction.date}`}
                        style={[
                          __gstyles__.shadow,
                          { justifyContent: "space-between", width: "100%" },
                        ]}
                        className="flex-row p-2 rounded-full py-4 px-4"
                        onPress={() => viewServiceManagement(transaction)}
                      >
                        <View className="flex-row items-center">
                          <Image source={transactionIcon} />
                          <Text>
                            <Text className="text-base">
                              {transaction.name} {"\n"}
                            </Text>
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
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              ))}
            </View>
          ))}
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
