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

const OpenAccount = () => {
    const navigation = useNavigation();

    const handleNext = () => {
        navigation.navigate("RegisterAccount");
    };

    const handleResend = () => {
        alert("Resend clicked!");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Account Activity</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <View style={styles.buttonContent}>
                        <View style={styles.leftSection}>
                            <Text style={styles.buttonTextHeader}>New Account</Text>
                            <Text style={styles.buttonTextSubHeader}>
                                Open a new eZiCash Account.
                            </Text>
                        </View>
                        <MaterialIcons
                            name="navigate-next"
                            size={24}
                            color="#007BFF"
                            style={styles.buttonIcon}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendText}>Terms and Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendText}>Privacy Notice</Text>
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
