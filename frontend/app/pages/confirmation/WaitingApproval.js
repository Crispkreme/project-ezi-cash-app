import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";

const WaitingApproval = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentId, payerId } = route.params;

  useEffect(() => {
    const executePayment = async () => {
      try {
        const response = await fetch(`${process.env.base_url}/success?PayerID=${payerId}&paymentId=${paymentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const errorText = await response.text();
    
        if (!response.ok) {
          console.error("Error Response:", errorText);
          alert("Payment Error", `Server returned: ${errorText}`);
          return;
        }
    
        try {
          const data = JSON.parse(errorText);
          console.log("data", data);
    
          if (response.ok) {
            alert('Payment success');
            navigation.navigate('Approved', { payment: data });
          } else {
            alert('Payment Failed', data.message || 'An error occurred.');
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
  }, [paymentId, payerId, navigation]);

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
