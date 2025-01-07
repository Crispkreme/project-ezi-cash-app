import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

export default function NavigationBar({formData, partnerType}) {

  const navigator = useNavigation();

  const viewTransactions = () => {
    navigator.navigate("PartnerTransactions", {formData});
  }
  const viewPartnerProfile = () => {
    navigator.navigate("PartnerProfile", {formData});
  }
  const viewDashboard = () => {
    navigator.navigate("PartnerDashboard", {formData});
  }
  const viewRequests = () => {
    navigator.navigate("PartnerRequests", {formData});
  }

  const handleConfirm = async () => {
    navigator.navigate("Dashboard", {formData});
  };

  const viewProfile = () => {
    navigator.navigate("Profile", {formData});
  }

  return (
    <>
    {
      partnerType === "" || partnerType === undefined ? (
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={handleConfirm}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={handleConfirm}>
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={viewProfile}>
            <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.footerBtnContainer} onPress={handleConfirm}>
            <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Settings</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footer} className='py-2 flex-row gap-4'>
          <TouchableOpacity style={styles.footerBtnContainer} className='relative' onPress={viewDashboard}>
            <Image className='' alt="cash out" source={require("../../public/icn/cash-out-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start' onPress={viewTransactions}>
            <Image alt="cash out" source={require("../../public/icn/transactions-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} onPress={viewRequests}>
            <Image alt="cash out" source={require("../../public/icn/settings-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtnContainer} className='flex-start'  onPress={viewPartnerProfile}>
            <Image alt="cash out" source={require("../../public/icn/profile-icn.png")}></Image>
            <Text style={styles.footerBtnLabel} className='text-gray-400 mb-2 text-sm'>Profile</Text>
          </TouchableOpacity>
        </View>
      )
    }
    </>
  )
}

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
