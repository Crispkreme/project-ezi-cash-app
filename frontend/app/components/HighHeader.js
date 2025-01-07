import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HighHeader({title, position}) { // position is high, mid, low

  const route = useRoute();
  const { formData } = route.params || {};
  const navigation = useNavigation();

  const urls = {
    high: require('../../public/image/high-bg.png'),
    mid: require('../../public/image/mid-bg.png'),
    low: require('../../public/image/low-bg.png'),
  }

  const stylesA = {
    high: styles.background,
    mid: styles.bgMid,
    low: styles.bgLow
  }

  const textStyles = {
    high: styles.subtext,
    mid: styles.subtext,
    low: styles.lowsubtext
  }
  
  const handleBack = () => {
    navigation.goBack();
  }

  const goToNotification = () => {
    navigation.navigate("Notification", {formData});
  }

  return (
    <ImageBackground style={stylesA[position]} className='bg-primary-bg' resizeMode="contain" source={urls[position]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Image style={styles.back} source={require("../../public/image/back.png")}/>
        </TouchableOpacity>
        <Text style={textStyles[position]} className={`text-white ${position === "low" ? 'w-full': ''}`}>
          {title}
        </Text>
        <TouchableOpacity onPress={goToNotification}>
          <Image style={styles.notification} source={require("../../public/icn/notification-icn.png")}/>
        </TouchableOpacity>
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
  bgLow: {
    zIndex:-1,
    height: 324,
    width: 384,
  },
  lowsubtext: {
    fontSize: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    top: 70
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