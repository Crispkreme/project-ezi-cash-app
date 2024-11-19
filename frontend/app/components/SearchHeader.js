import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";

export default function SearchHeader() {
  const [state, setState] = useState({
    search: ''
  });

  const route = useRoute();
  const navigation = useNavigation();
  const { formData } = route.params || {}; // Retrieve the OTP from params

  const handleBack = () => {
    navigation.goBack();
  }

  const handleSearch = () => {
    navigation.setParams({ search: state.search, key: Math.random() });
  }
  return (
    <ImageBackground style={styles.background} className='bg-primary-bg' resizeMode="contain" source={require("../../public/image/high-bg.png")}>
      <View style={styles.container} className='absolute bottom-16'>
        <TouchableOpacity onPress={handleBack}>
          <Image style={styles.back} source={require("../../public/image/back.png")}/>
        </TouchableOpacity>
        <View style={{flex: 1}} className='mt-4 self-center flex-row'>
          <TextInput
            className='relative top-12 w-full border-b border-black mb-4 bg-white text-primary px-4 rounded-full'
            placeholder="Search"
            value={state.search}
            onChangeText={(text) => setState(prev => ({...prev, search: text}))}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image className='absolute right-2 top-4' source={require("../../public/icn/search-icn.png")}/>
          </TouchableOpacity>
        </View>
        
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