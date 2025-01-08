import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, FlatList } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { __gstyles__ } from "../globalStylesheet";
import { socket } from "./Main";

const GoToStore = ({ route }) => {

  // const { formData, partner, payment, paymentId, payerId, data } = route.params;
  const { formData, transactionId, transactionData } = route.params;
  
  useEffect(() => {
    socket.on('receive-message', (message) => {
      alert(message);
      if(message.receiver_id == formData.user_id)
      {
        setMessages((prev) => [
          ...prev,
          {
            ...message,
            sender_id: message.sender_id,
            receiver_id: message.receiver_id,
            message: message.message,
            created_at: message.created_at,
          },
        ]);
      }
    });
  }, []);

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0
  });

  const [init, setInit] = useState(false);
  const [map, setMap] = useState({
    latitude: 10.31423656557551,
    longitude: 123.90543601653494,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [messages, setMessages] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [curMarker, setCurMarker] = useState({
    latitude: 0, 
    longitude: 0,
  });

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.base_url}/get-user-message/${transactionData.id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const responseData = await response.json();
      setMessages(responseData.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.base_url}/get-transactions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setTransactions(responseData.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
  
    const messageData = {
      sender_id: formData.user_id,
      receiver_id: transactionData.partner_id,
      transaction_id: transactionData.id,
      message: newMessage.trim(),
    };
  
    try {
      const response = await fetch(`${process.env.base_url}/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
  
      if (response.ok) {
        const sentMessage = await response.json();
        socket.emit("send-message", sentMessage);
        setMessages((prev) => [
          ...prev,
          {
            ...sentMessage,
            sender_id: sentMessage.sender_id,
            receiver_id: sentMessage.receiver_id,
            message: sentMessage.message,
            created_at: sentMessage.created_at,
          },
        ]);
        setNewMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const joinRoom = () => {
    const roomId = transactionData.id;
    console.log('room id', roomId);
    socket.emit("send-message", roomId);
    
    console.log(`Joined room: ${roomId}`);
  };

  const handleConfirm = async () => {
    try {
      const payload = { formData, transactionData };

      const response = await fetch(`${process.env.base_url}/paypal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const body = await response.json();
  
      if (!response.ok) {
        alert(body.message || "Failed to process payment.");
        return;
      }
  
      const { approvalUrl } = body;
      if (approvalUrl) {
        navigator.navigate("PayPalWebView", {
          uri: approvalUrl,
          data: body,
          formData,
          transactionData,
        });
      } else {
        alert("Approval URL not found in the server response.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    console.log("init");
    setMap({
      latitude: 10.31423656557551,
      longitude: 123.90543601653494,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setInit(true);
    fetchMessages();
    fetchTransactions();
    joinRoom();
  },[]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View style={{ flex: 1 }}>
        {init ? (
          <MapView
            onMapReady={() => {
              console.log("Map is ready!");
            }}
            style={{ flex: 1, height: 450, width: '100%' }}
            region={map}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              pinColor="red"
              coordinate={{
                latitude: 10.31423656557551,
                longitude: 123.90543601653494,
              }}
              title="Partner Location"
              description="Partner Location"
            />
            {curMarker.latitude !== 0 && (
              <Marker
                pinColor="red"
                coordinate={curMarker}
                title="Your Location"
                description="Your Location"
              />
            )}

            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#0000FF"
              strokeWidth={6}
            />
          </MapView>
        ) : (
          <Text> Loading ... </Text>
        )}
      </View>

      <View style={styles.header}>
        <Text className="text-primary text-xl font-semibold mb-4">Chat</Text>
      </View>
      
      <View className="flex-1 bg-white p-4 rounded-lg shadow border border-gray-300">
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className={`flex mb-2 ${
                item.sender_id === transactionData.user_id
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <View
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  item.sender_id === transactionData.user_id
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <Text className="text-sm">{item.message}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        />

        <View className="flex flex-row items-center mt-4">
          <TextInput
            className="flex-1 p-4 bg-gray-200 rounded-lg text-sm"
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity
            className="ml-2 p-2 rounded-full"
            onPress={sendMessage}
          >
            <MaterialIcons name="send" size={24} color="bg-blue-500" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="py-4 mt-6">
        <TouchableOpacity
          className="bg-primary p-4 rounded-lg"
          onPress={handleConfirm}
        >
          <Text className="text-white text-center font-bold">Arrived</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoToStore;

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
