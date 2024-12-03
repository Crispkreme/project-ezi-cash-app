import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function PartnerDashboardHeader({profile = false}) {

  const route = useRoute();
  const navigation = useNavigation();
  const { formData } = route.params || {}; // Retrieve the OTP from params

  const handleBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={[styles.header]} className={`${profile ? 'flex-row items-center justify-center gap-4': 'flex-col'}`}>
          
        { !profile && (
          <Text className='self-start mt-8'>
            <Text className="text-white">{new Date().toDateString()} {"\n"}</Text>
            <Text style={styles.text} className='z-50 text-white'>
              <Text>Hi eZiCash Partner,</Text>
            </Text>
          </Text>
        )}

        {
          profile && (
            <View className='w-24 h-24 rounded-full bg-white'></View>
          )
        }
        <Text style={styles.subtext} className=' mt-1 text-white'>
          {formData.first_name} {formData.middle_name} {formData.last_name}
        </Text>
      </View>
      <Image style={{marginHorizontal: profile ? 20 : 30, top: profile ? -50 : 0}} source={require("../../public/icn/notification-icn.png")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    zIndex:-1,
    height: 285,
    width: 388.5,
  },
  header: {
    marginVertical: 40,
    marginHorizontal: 30
  },
  container: {
    marginVertical: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 26,
    fontWeight: 'semibold'
  },
  subtext: {
    fontSize: 18
  },
})