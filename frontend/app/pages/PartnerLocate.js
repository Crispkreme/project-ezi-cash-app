import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Touchable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { __gstyles__ } from "../globalStylesheet";

const PartnerLocate = ({ route }) => {
  const { formData, partner, payment } = route.params;
  console.log(payment);

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: '09222222',
    amount: 0
  });

  const handleConfirm = async () => {
    navigator.navigate("FinishTransaction", { formData, partner, payment });
  };

  const handleNext = () => {
    alert(5);
  };

  const onRegionChange = (region) => {
    setMap(region);
  }

  const [init, setInit] = useState(false);
  const [map, setMap] = useState({
    latitude: 10.31423656557551,
    longitude: 123.90543601653494,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

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

  return (
    <View style={styles.container}>
      
      <ScrollView>
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
                    <View style={{flex: 1, height: 50, width: 50}}>
                      <Image source={require("../../public/icn/pointer.png")}></Image>
                    </View>
                  </Marker>
                </MapView>
            ) : (
              <Text>Loading...</Text>
            )
          }
        </View>

        <View style={styles.header}>
          <Text className='text-primary text-left font-semibold text-xl pt-8'>Chat</Text>
        </View>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300'>
          <View className=' p-2 px-4'>
            <View className='gap-2'>
              <View style={styles.leftSection}>
                <Text className='font-semibold bg-primary self-start rounded-full text-lg text-primary'>E-Wallet</Text>
                <Text className='text-sm'>Ezicash Partner</Text>
              </View>
              <View className='text-right'>
                <Text className='font-semibold bg-gray-400 text-gray-400 self-end rounded-full text-lg'>E-Wallet</Text>
                <Text className='text-sm text-right'>You</Text>
              </View>
            </View>
          </View>
          <View className='flex-row'>
            <TextInput
              className='w-full p-4 mt-4 mb-4 text-sm bg-gray-200'
              placeholder="Send message"
              value={state.amount}
              onChangeText={(am) => setState(prev => ({...prev, amount: am}))}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <MaterialIcons
              name="send"
              size={16}
              className=' absolute right-4 top-8'
              style={styles.buttonIcon}
            />
          </View>
        </TouchableOpacity>

        <View className='py-4 mx-auto self-center bottom-4 w-full'>
          <TouchableOpacity className='bg-primary p-4 rounded-lg' onPress={handleConfirm}>
            <Text className='font-bold text-white text-center w-full'>Arrived</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
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