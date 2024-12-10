import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

export default function DashboardHeader({profile = false}) {

  const route = useRoute();
  const navigation = useNavigation();
  const { formData } = route.params || {}; // Retrieve the OTP from params

  const handleBack = () => {
    navigation.goBack();
  }
  return (
    <ImageBackground style={styles.background} className='bg-primary-bg' resizeMode="contain" source={require("../../public/image/dashboard-bg.png")}>
      <View style={styles.container}>
        <View style={[styles.header, {top: profile ? 50 : 0}]} className={`${profile ? 'flex-row items-center justify-center gap-4': 'flex-col'}`}>
          { !profile && (
            <View>
              <Text style={styles.text} className='z-50 text-white w-full mt-8'>Hello!</Text>
            </View>
          )}

          {
            profile && (
              <View className='w-24 h-24 rounded-full bg-white'></View>
            )
          }
          <Text style={styles.subtext} className=' mt-2 text-white'>
            {formData.name}
          </Text>
        </View>
        <Image style={{marginHorizontal: profile ? 20 : 30, top: profile ? -50 : 0}} source={require("../../public/icn/notification-icn.png")}/>
      </View>
    </ImageBackground>
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
    fontSize: 20
  },
})