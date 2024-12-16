import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavigationBar from "../components/NavigationBar";

const PartnerProfile = ({ route, navigation }) => {
  const { formData } = route.params;

  const wLabels = {...formData};
  const navigator = useNavigation();

  const logOut = () => {
    navigator.navigate("Main");
  }

  return (
    <View style={styles.container}>
      
      <ScrollView>
        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>My Account</Text>
        </View>
        <View>
          <View className='flex-row justify-between items-center p-2 px-8'>
            <View>
              <Text className='text-base text-primary'>
                  Favorites
              </Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>

          <TouchableOpacity className='flex-row justify-between items-center p-2 px-8'>
            <View>
              <Text className='text-base text-primary'>
                  E-Wallets
              </Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <View className='flex-row justify-between items-center p-2 px-8'>
            <View>
              <Text className='text-base text-primary'>
                  Saved eZiCash Partners
              </Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </View>
        <View className='px-4'>
          <View
            className='mt-4 mx-4 border-gray-500'
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>General</Text>
        </View>

        <View>
          <View className='flex-row justify-between items-center p-2 px-8'>
            <View>
              <Text className='text-base text-primary'>
                  Settings
              </Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>

          <View className='flex-row justify-between items-center p-2 px-8'>
            <View>
              <Text className='text-base text-primary'>
                  Language
              </Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              className='text-primary'
              style={styles.buttonIcon}
            />
          </View>
        </View>

        <View className='px-4'>
          <View
            className='mt-4 mx-4 border-gray-500'
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        <View style={styles.header}>
          <Text className='text-primary font-semibold text-xl pt-8'>Opportunity</Text>
        </View>

        <View className='px-4'>
          <View
            className='mt-4 mx-4 border-gray-500'
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        <TouchableOpacity onPress={logOut} className='flex-row justify-between items-center p-2 px-8'>
          <View>
            <Text className='text-base text-primary'>
                Logout
            </Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            className='text-primary'
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

      </ScrollView>
      <NavigationBar formData={formData} partnerType={formData.partner_type} />
    </View>
  );
};

export default PartnerProfile;

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
