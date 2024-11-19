import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HighHeaderV2({title, position}) { // position is high, mid, low

  const route = useRoute();
  const navigation = useNavigation();
  const { formData } = route.params || {}; // Retrieve the OTP from params

  const urls = {
    high: require('../../public/image/high-bg.png'),
    mid: require('../../public/image/mid-bg.png')
  }

  const stylesA = {
    high: styles.background,
    mid: styles.bgMid
  }
  
  const handleBack = () => {
    navigation.goBack();
  }
  return (
    <ImageBackground style={stylesA[position]} className='bg-primary-bg' resizeMode="contain" source={urls[position]}>
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
  bgMid: {
    zIndex:-1,
    height: 208,
    width: 384,
  },
  header: {
    marginVertical: 40,
    marginHorizontal: 30
  },
  container: {
    marginVertical: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'visible'
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