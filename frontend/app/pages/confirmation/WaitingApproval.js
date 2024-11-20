import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const WaitingApproval = ({route}) => {
  const navigation = useNavigation();
  const { formData } = route.params;

  setTimeout(() => {
    navigation.navigate("Approved", {formData});
  },3000);
  return (
    <View style={styles.container} className='bg-primary'>

      <AntDesign
        name="loading1"
        size={100}
        className='text-primary'
        style={styles.buttonIcon}
      />
    </View>
  );
};

export default WaitingApproval;

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#555",
  },
  blueText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    width: 50,
    height: 50,
  },
  resendText: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
