import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { __gstyles__ } from "../globalStylesheet";
import * as Location from 'expo-location';

const SearchPartner = ({ route, navigation }) => {

  const { formData, amount, store, search, key } = route.params;
  const wLabels = {...formData};
  const [isLoading, setIsLoading] = useState(true);
  const [partner, setPartner] = useState([]);
  const navigator = useNavigation();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [init, setInit] = useState(false);
  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0,
    init: false
  });

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if(status != 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurMarker({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })
    
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
    if(curMarker.latitude === 0) getLocation();

    const start = {lat: curMarker.latitude, lng: curMarker.longitude}
    const end = {lat: 10.31423656557551, lng: 123.90543601653494}
    const directionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${process.env.google_maps_api_key}`;

    const res = await fetch(directionsApiUrl);
    const data = await res.json();

    const route = data.routes[0];
    const points = decodePolyline(route.overview_polyline.points);
    setRouteCoordinates(points);
  }
  const onRegionChange = (region) => {
    setMap(region);
  }
  const [map, setMap] = useState({
    latitude: 10.31423656557551,
    longitude: 123.90543601653494,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [curMarker, setCurMarker] = useState({
    latitude: 0, 
    longitude: 0,
  });

  const handleConfirm = async () => {
    navigator.navigate("SetMPIN", { formData });
  };
  const handlePress = (item) => {
    navigator.navigate("Partner", {
      formData,
      partner: {
        amount,
        legal_name: item.store_name,
        address: `79 Cabreros St ${item.barangay}, ${item.city}`,
        type: item.partner_type,
        store_id: item.partner_id,
      },
    });
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
  },[]);
  useEffect(() => {
    if(!state.init) {
      setState(prev => ({...prev, init: true}));
    } else {
      alert(search);
    }
  },[key]);
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await fetch(`${process.env.base_url}/get-partners`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          alert("No business partner available");
        }

        const result = await response.json();
        setPartner(result.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartner();
  }, []);

  return (
    <View style={styles.container}>
      
      <ScrollView>
        {/* <Image source={require("../../public/image/sample-google-maps.png")}/> */}
        <View style={{flex: 1}}>
          {
            init ? (
              <MapView
                onMapReady={() => {
                  console.log("Map is ready!");
                  
                }}
                  style={{ flex: 1, height: 450, width:500 }}
                  region={map}
                  provider={PROVIDER_GOOGLE}
                >
                  <Marker 
                    pinColor="red" 
                    coordinate={{
                      latitude: 10.31423656557551, 
                      longitude: 123.90543601653494
                    }}
                    title="asdasd"
                    description="asdasd"
                  >
                  </Marker>

                  {
                    curMarker.latitude !== 0 ? (
                      <Marker 
                        pinColor="red" 
                        coordinate={curMarker}
                        title="asdasd"
                        description="asdasd"
                      >
                      </Marker>
                    ) : (
                      null
                    )
                  }

                  <Polyline coordinates={routeCoordinates} strokeColor="#0000FF" strokeWidth={6} />
                </MapView>
            ) : (
              <Text> Loading ... </Text>
            )
          }
        </View>
        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>eZiCash Partners Nearby</Text>
        </View>

        <View>
          {Array.isArray(partner) && partner.length > 0 ? (
            partner.map((item, index) => (
              <View key={item.business_hour_id || index}>
                <TouchableOpacity
                  style={[__gstyles__.shadow]}
                  className="bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300"
                  onPress={() => handlePress(item)}
                >
                  <View
                    style={{ justifyContent: "space-between" }}
                    className="flex-row items-center p-2 px-4"
                  >
                    <View
                      className="gap-2"
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={styles.leftSection}>
                        <Text className="font-semibold text-lg text-primary">
                          {item.store_name}
                        </Text>
                        <Text className="text-sm text-primary">
                          79 Cabreros St {item.barangay}, {item.city}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          <Image
                            alt="cash in"
                            source={require("../../public/icn/available-icn.png")}
                          />
                          <Text className="text-sm text-link">Available</Text>
                        </View>
                      </View>
                    </View>
                    <MaterialIcons
                      name="navigate-next"
                      size={24}
                      className="text-primary"
                      style={styles.buttonIcon}
                    />
                  </View>
                </TouchableOpacity>

                {index !== partner.length - 1 && (
                  <View
                    className="mb-4 border-gray-500"
                    style={{
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                )}
              </View>
            ))
          ) : (
            <Text>No partners found nearby.</Text>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

export default SearchPartner;

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
