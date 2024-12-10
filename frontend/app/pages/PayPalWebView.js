import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

const PayPalWebView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { uri, data } = route.params;
  
  console.log("PayPalWebView uri", uri);
  console.log("PayPalWebView data", data);

  if (!uri) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No URL provided for WebView.</Text>
      </View>
    );
  }

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;

    if (url.includes('success')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const paymentId = urlParams.get('paymentId');
      const payerId = urlParams.get('PayerID');

      if (paymentId && payerId) {
        navigation.navigate('WaitingApproval', { paymentId, payerId, data });
      }
    }

    if (url.includes('cancel')) {
      navigation.navigate('Cancelled', { data });
    }
  };

  return (
    <WebView
      source={{ uri }}
      style={{ flex: 1 }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default PayPalWebView;
