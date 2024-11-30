import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { __gstyles__ } from "../globalStylesheet";

const SearchPartner = ({ route, navigation }) => {
  const { formData, search, key } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0,
    init: false
  });

  useEffect(() => {
    if(!state.init) {
      setState(prev => ({...prev, init: true}));
    } else {
      alert(search);
    }
  },[key]);

  const handleConfirm = async () => {
    // try {
    //     const response = await fetch('http://192.168.1.33:3000/register', {
    //         method: 'POST',
    //         credentials: 'include',
    //     }, formData);

    //   alert("Details saved successfully!");
    //   navigation.navigate("Home");

    // } catch (error) {

    //   console.error(error);
    //   alert("Error saving details. Please try again.");
    // }
    navigator.navigate("SetMPIN", { formData });
  };

  const handleNext = () => {
    navigator.navigate("Partner", { formData,  partner: {name: "Nicole Ayessa Alcover", address: "79 Cabreros St Cebu City, Cebu", type: "Individual"}});
  };

  const onRegionChange = (region) => {
    setMap(region);
  }

  const [map, setMap] = useState({
    latitude: 10.31423656557551,
    longitude: 123.90543601653494,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(() => {
    setMap({
      latitude: 10.31423656557551,
      longitude: 123.90543601653494,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    
    console.log("Google Maps API Key:", process.env.google_maps_api_key);
  },[]);

  return (
    <View style={styles.container}>
      
      <ScrollView>
        {/* <Image source={require("../../public/image/sample-google-maps.png")}/> */}
        <View style={{flex: 1}}>
          <MapView
            style={{ flex: 1, height: 450, width:500 }}
            initialRegion={{
              latitude: 10.31423656557551,
              longitude: 123.90543601653494,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChange={onRegionChange}
            provider={PROVIDER_GOOGLE}
          >
            <Marker 
              pinColor="red" 
              coordinate={{
                longitude: 10.31423656557551, 
                latitude: 123.90543601653494
              }}
              title="asdasd"
              description="asdasd"
            />
          </MapView>
        </View>
        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>eZiCash Partners Nearby</Text>
        </View>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={handleNext}>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='font-semibold text-lg text-primary'>Nicole Ayessa Alcover</Text>
                <Text className='text-sm text-primary'>
                    79 Cabreros St Cebu City, Cebu
                </Text>
                <View className='flex-row items-center gap-2'>
                  <Image alt="cash in" source={require("../../public/icn/available-icn.png")}></Image>
                  <Text className='text-sm text-link'>
                    Available
                  </Text>
                </View>
              </View>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>

        <View
          className='mb-4 border-gray-500'
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300' onPress={handleNext}>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <View className='gap-2' style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.leftSection}>
                <Text className='font-semibold text-lg text-primary'>Nicole Ayessa Alcover</Text>
                <Text className='text-sm text-primary'>
                    79 Cabreros St Cebu City, Cebu
                </Text>
                <View className='flex-row items-center gap-2'>
                  <Image alt="cash in" source={require("../../public/icn/available-icn.png")}></Image>
                  <Text className='text-sm text-link'>
                    Available
                  </Text>
                </View>
              </View>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>

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
