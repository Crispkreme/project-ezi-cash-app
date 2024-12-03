import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function PaymentConfirmationHeader({title}) {

  const route = useRoute();
  const navigation = useNavigation();
  const { mobileNumber } = route.params || {}; // Retrieve the OTP from params


  const handleBack = () => {
    navigation.goBack();
  }
  return (
    <ImageBackground style={styles.background} className='bg-primary-bg' resizeMode="contain" source={require("../../public/image/bg.png")}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Image  className='' style={styles.back} source={require("../../public/image/back.png")}/>
        </TouchableOpacity>
        <View style={styles.header}>
          <View className='flex flex-row items-center'>
            <Text style={styles.text} className='z-50 text-center text-white w-full mt-8'>{title}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    zIndex:-1,
    height: 285,
    width: 387,
  },
  header: {
    marginVertical: 40
  },
  container: {
    marginVertical: 50
  },
  text: {
    fontSize: 25,
  },
  back: {
    marginHorizontal: 20,
    position: 'absolute'
  }
})