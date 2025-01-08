import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { __gstyles__ } from "../globalStylesheet";

const FinishTransaction = ({ route }) => {
  const { paymentId, payerId, data, formData, transactionData, isPartner } = route.params;
  
  console.log("paymentId", paymentId);
  console.log("payerId", payerId);

  const navigator = useNavigation();
  const handleConfirm = async () => {
    try {
      const payload = {
        PayerID: payerId,
        paymentId,
        data: {
          ...data,
          body: {
            ...data.body,
            payment: data.body.transactionData,
          },
        },
      };

      console.log("Payload:", payload);

      const response = await fetch(`${process.env.base_url}/success`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Error Response:", responseText);
        alert("Payment Error", `Server returned: ${responseText}`);
        return;
      }

      try {
        const parsedResponse = JSON.parse(responseText);
        console.log("Response Data:", parsedResponse);

        if (response.ok) {
          alert('Payment success');
          navigator.navigate("TransactionComplete", { formData, transactionData, checkReceipt: false, isPartner });
        } else {
          alert('Payment Failed', parsedResponse.message || 'An error occurred.');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        alert("Response parsing error", "There was an issue parsing the server response.");
      }
    } catch (error) {
      console.error('Error executing payment:', error);
      alert('Payment Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 120 }} className="text-sm text-primary text-center">
        Click Icon to finish the rest of the application
      </Text>
      <TouchableOpacity
        onPress={() => alert('Next action')}
        style={[__gstyles__.shadow, { padding: 40 }]}
        className="bg-primary-bg rounded-lg mb-4 border border-gray-300 self-center"
      >
        <Image alt="cash in" source={require("../../public/image/transaction-complete.png")} />
      </TouchableOpacity>

      <View className="absolute py-4 mx-auto self-center bottom-4 w-full">
        <TouchableOpacity className="bg-primary p-4 rounded-lg" onPress={handleConfirm}>
          <Text className="font-bold text-white text-center w-full">Completed</Text>
        </TouchableOpacity>
        <Text
          style={{ marginBottom: 10 }}
          className="mt-4 text-sm text-primary text-center"
        >
          Click Complete button after finishing the transaction.
        </Text>
      </View>
    </View>
  );
};

export default FinishTransaction;

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
