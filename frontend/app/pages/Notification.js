import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { __gstyles__ } from "../globalStylesheet";

const Notification = ({ route, navigation }) => {
  const { formData } = route.params || {};

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [notifications, setNotifications] = useState([]);

  const [state, setState] = useState({
    linkedWallet: formData?.phone || "",
  });

  useEffect(() => {
    const getDt = async () => {
      const dt = await fetch(process.env.base_url + '/get-notifications/' + (formData.partner_type === "" ? formData.user_id : formData.partner_application_id) + '/' + (formData.partner_type === "" ? "customer" : formData.partner_type));
      
      const body = await dt.json();
      if(!dt.ok) {
        alert(body.message);
      }

      setNotifications(body.data);
    }

    getDt();
  },[]);

  const goToTransaction = async (transaction_id, notification_type) => {
    if(notification_type === "Request" && formData.partner_type === "") {
      navigator.navigate("WaitingApproval", {formData, transaction_id});
    } else if(notification_type === "Approved" && formData.partner_type === ""){
      const response = await fetch(`${process.env.base_url}/get-user-transaction?transactionId=${transaction_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      navigator.navigate("GoToStore", {
        formData,
        transactionId: transaction_id,
        transactionData: responseData.data,
      });
    } else if(notification_type === "Success"){
      const response = await fetch(`${process.env.base_url}/get-user-transaction?transactionId=${transaction_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      navigator.navigate("TransactionComplete", { formData, transactionData: responseData.data, checkReceipt: true, isPartner: formData.partner_type !== "" });
    } else if(notification_type === "Request" && formData.partner_type !== "") {
      navigator.navigate("PartnerRequests", {formData});
    } else if(notification_type === "Approved" && formData.partner_type !== ""){
      const response = await fetch(`${process.env.base_url}/get-user-transaction?transactionId=${transaction_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      navigator.navigate("PartnerLocate", {
        formData,
        transactionId: transaction_id,
        transactionData: responseData.data,
      });
    }
  }
  return (
    <View style={styles.container}>
      
      <ScrollView>

        {
          notifications.map( (n, idx) => {
            return (
              <TouchableOpacity onPress={() => goToTransaction(n.transaction_id, n.notification_type)} key={idx} style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300'>
                <View style={{justifyContent: 'space-between', flexDirection: 'column'}} className=' items-start gap-2 p-2 px-4'>
                  <Text className='font-bold'>
                    {n.notification_type === "Request" ?
                      formData.partner_type === "" ? "Request Application" : "New Request"
                    :n.notification_type === "Approved" ? 
                      formData.partner_type === "" ? "Request Approved": "Request Approved"
                    :n.notification_type === "Success" ?
                      formData.partner_type === "" ? "Request Success": "Request Success"
                    :""}
                  </Text>
                  <Text>
                    {n.notification_type === "Request" ? 
                      formData.partner_type === "" ? `Requested ${n.service} Service to ${n.legal_name} amounting ₱${n.total_amount}. Waiting for approval.` : `${n.name} requested to ${n.service}`
                    :n.notification_type === "Approved" ? 
                      formData.partner_type === "" ? `Your ${n.service} request with ${n.legal_name} has been Approved!`: `You approved the ${n.service} request from ${n.name}`
                    :n.notification_type === "Success" ? 
                      formData.partner_type === "" ? `Your ${n.service} request with ${n.legal_name} is successful!`: `${n.service} service from ${n.name} is successful!`
                    :""}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  );
};

export default Notification;

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
