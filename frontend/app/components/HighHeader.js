import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HighHeader({title}) {

  const route = useRoute();
  const navigation = useNavigation();
  const { formData } = route.params || {}; // Retrieve the OTP from params

  const handleBack = () => {
    navigation.goBack();
  }
  return (
    <ImageBackground style={styles.background} className='bg-primary-bg' resizeMode="contain" source={require("../../public/image/high-bg.png")}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Image style={styles.back} source={require("../../public/image/back.png")}/>
        </TouchableOpacity>
        <Text style={styles.subtext} className=' text-white'>
          {title}
        </Text>
        <Image style={styles.notification} source={require("../../public/icn/notification-icn.png")}/>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    zIndex:-1,
    height: 182.5,
    width: 388.5,
  },
  header: {
    marginVertical: 40,
    marginHorizontal: 30
  },
  container: {
    marginVertical: 80,
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
  notification: {
    marginHorizontal: 30
  },
  back: {
    marginHorizontal: 20,
  }
})