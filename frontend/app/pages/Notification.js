import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { __gstyles__ } from "../globalStylesheet";

const Notification = ({ route, navigation }) => {
  const { formData } = route.params || {};

  const wLabels = {...formData};
  const navigator = useNavigation();

  const [state, setState] = useState({
    linkedWallet: formData?.phone || "",
  });

  useEffect(() => {
    const getDt = async () => {
      console.log(process.env.base_url + '/get-notifications/' + formData.user_id + '/' + (formData.partner_type === "" ? "customer" : formData.partner_type));
      const dt = await fetch(process.env.base_url + '/get-notifications/' + formData.user_id + '/' + (formData.partner_type === "" ? "customer" : formData.partner_type));
      
      const body = await dt.json();
      if(!dt.ok) {
        alert(body.message);
      }

      console.log(body.data);
    }

    getDt();
  },[]);


  return (
    <View style={styles.container}>
      
      <ScrollView>

        <TouchableOpacity style={[__gstyles__.shadow]} className='bg-primary-bg p-4 rounded-lg mb-4 border border-gray-300'>
          <View style={{justifyContent: 'space-between'}} className='flex-row items-center p-2 px-4'>
            <Text>
              Notification
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Notification;

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
