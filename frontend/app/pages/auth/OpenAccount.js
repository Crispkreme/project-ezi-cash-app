import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../../../public/svg/logo";

const OpenAccount = () => {
    const navigation = useNavigation();

    const handleNext = () => {
        navigation.navigate("RegisterAccount");
    };

    const handleResend = () => {
        alert("Resend clicked!");
    };

    return (
        <View style={styles.container} className='text-primary'>
            <View style={styles.header}>
                <Text className='text-2xl text-primary text-center font-semibold' >Account Activity</Text>
            </View>
            <View className='items-center mb-32'>
              <Logo></Logo>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <View className='flex-row items-center p-2 px-4'>
                        <View style={styles.leftSection}>
                            <Text className='font-semibold text-lg text-primary'>New Account</Text>
                            <Text className='text-sm text-primary'>
                                Open a new eZiCash Account.
                            </Text>
                        </View>
                        <MaterialIcons
                            name="navigate-next"
                            size={24}
                            className='text-primary'
                            style={styles.buttonIcon}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handleResend}>
                    <Text className='text-primary mb-2'>Terms and Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResend}>
                    <Text className='text-primary pb-8'>Privacy Notice</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OpenAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scrollContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftSection: {
        flex: 1,
    },
    buttonTextHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    buttonTextSubHeader: {
        fontSize: 14,
        color: "#555",
    },
    buttonIcon: {
        marginLeft: 10,
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    resendText: {
        fontSize: 16,
        color: "#007BFF",
        textDecorationLine: "underline",
        marginVertical: 5,
    },
});
