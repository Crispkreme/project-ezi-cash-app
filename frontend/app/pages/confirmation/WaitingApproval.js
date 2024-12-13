import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const WaitingApproval = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const { formData = {}, partner = {}, payment = {} } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const payload = {
          ...formData,
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
        };
  
        const response = await fetch(`${process.env.base_url}/paypal`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const body = await response.json();
        console.log("Server Response:", body);
  
        if (!response.ok) {
          alert(body.message || "Failed to process payment.");
          return;
        }
  
        const { approvalUrl } = body;
  
        if (approvalUrl) {
          navigator.navigate("PayPalWebView", { uri: approvalUrl, data: body });
        } else {
          alert("Approval URL not found in the server response.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };
  
    initiatePayment();
  }, [formData, partner, navigator]);
  

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
