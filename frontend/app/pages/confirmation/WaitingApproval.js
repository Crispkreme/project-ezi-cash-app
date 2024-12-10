import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";

const WaitingApproval = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentId, payerId, data } = route.params;

  useEffect(() => {
    const executePayment = async () => {
      try {
        const payload = {
          PayerID: payerId,
          paymentId,
          data,
        };
  
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
            navigation.navigate('Approved', { payment: parsedResponse });
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
  
    executePayment();
  }, [paymentId, payerId, data, navigation]);
  
  return (
    <View style={styles.container}>
      <AntDesign
        name="loading1"
        size={100}
        style={{ color: '#6200ea' }}
      />
    </View>
  );
};

export default WaitingApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f9f9f9",
  },
});
