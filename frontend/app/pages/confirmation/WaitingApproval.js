import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const WaitingApproval = () => {
  const route = useRoute();
  const { formData, transactionId } = route.params;
  
  const navigator = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState(null);

  // Fetch the transaction details
  const fetchTransaction = async () => {
    try {
      const response = await fetch(`${process.env.base_url}/get-user-transaction?transactionId=${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log("response", responseData);

      if (responseData.data) {
        setTransactionStatus(responseData.data.transaction_status);
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      alert('Error', 'An error occurred while fetching transactions.');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTransaction();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [transactionId]);

  // Stop loading and show success icon when the transaction is approved
  useEffect(() => {
    if (transactionStatus === 'Approved') {
      setIsLoading(false);
    }
  }, [transactionStatus]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <AntDesign name="loading1" size={100} style={styles.loadingIcon} />
      ) : (
        <AntDesign name="checkcircle" size={100} style={styles.successIcon} />
      )}
    </View>
  );
};

export default WaitingApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingIcon: {
    color: "#6200ea",
  },
  successIcon: {
    color: "green",
  },
});
