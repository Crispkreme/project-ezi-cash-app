import React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const PayPalWebView = () => {
    
  const route = useRoute();
  const { uri } = route.params;

  if (!uri) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No URL provided for WebView.</Text>
      </View>
    );
  }

  return <WebView source={{ uri }} style={{ flex: 1 }} />;
};

export default PayPalWebView;
