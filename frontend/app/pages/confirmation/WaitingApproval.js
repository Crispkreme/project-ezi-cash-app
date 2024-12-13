import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const WaitingApproval = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const { formData, transactionId } = route.params;
  
  console.log("formData", formData);
  console.log("transactionId", transactionId);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <AntDesign name="loading1" size={100} style={styles.loadingIcon} />
      ) : (
        <AntDesign name="checkcircle" size={100} style={styles.successIcon} />
      )}
    </View>
  );
};

export default WaitingApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingIcon: {
    color: "#6200ea",
  },
  successIcon: {
    color: "green",
  },
});
