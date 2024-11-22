import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const InitialLoading = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate("Login");
  },3000);

  return (
    <View style={styles.container}>
      <Image source={require('../../public/image/main-logo.png')}/>
    </View>
  );
};

export default InitialLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});