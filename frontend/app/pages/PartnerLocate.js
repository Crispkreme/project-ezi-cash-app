import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet, TextInput,
  FlatList
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

const PartnerLocate = ({ route }) => {
  const { formData, transactionData } = route.params;
  const navigator = useNavigation();
  const [init, setInit] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [curMarker, setCurMarker] = useState({
    latitude: 0, 
    longitude: 0,
  });
  const [map, setMap] = useState({
    latitude: 10.31423656557551,
    longitude: 123.90543601653494,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status != 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurMarker({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  }

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0;
    let len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1E5, longitude: lng / 1E5 });
    }

    return points;
  };

  const getDirection = async () => {
    if (curMarker.latitude === 0) getLocation();

    const start = { lat: curMarker.latitude, lng: curMarker.longitude }
    const end = { lat: 10.31423656557551, lng: 123.90543601653494 }
    const directionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${process.env.google_maps_api_key}`;

    const res = await fetch(directionsApiUrl);
    const data = await res.json();

    const route = data.routes[0];
    const points = decodePolyline(route.overview_polyline.points);
    setRouteCoordinates(points);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.base_url}/get-user-message?partner_id=${transactionData.partner_id}&user_id=${transactionData.user_id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      const responseData = await response.json();

      setMessages(responseData.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      sender_id: transactionData.user_id,
      receiver_id: transactionData.partner_id,
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

  useEffect(() => {
    const fetchMessagesInterval = setInterval(() => {
      fetchMessages();
    }, 2000);
  
    return () => clearInterval(fetchMessagesInterval);
  }, [transactionData]);

  useEffect(() => {
    setInit(true);
  }, []);

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
      <Text className="text-primary font-semibold text-xl pt-8">eZiCash Partners Nearby</Text>
      <Text className="text-primary text-xl font-semibold mb-4">Chat</Text>

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
          onPress={() =>
            navigator.navigate("FinishTransaction", {
              formData,
              transactionData,
            })
          }
        >
          <Text className="text-white text-center font-bold">Arrived</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PartnerLocate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
  },
  sendButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 5,
    backgroundColor: "transparent",
  },
  buttonIcon: {
    marginLeft: 10,
  },
  footerBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerBtnLabel: {
    maxWidth: 100,
    fontSize: 10,
  },
  footer: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    marginVertical: 5,
  },
});
