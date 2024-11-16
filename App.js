import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import LoginLayout from "./Components/Layouts/LoginLayout";
import Dashboard from "./Pages/Dashboard";

const Stack = createStackNavigator();

const App = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Static credentials for validation
  const staticCredentials = {
    email: "user@example.com",
    password: "password123",
  };

  const handleLogin = (navigation) => {
    setIsSubmitting(true);

    if (
      formData.email === staticCredentials.email &&
      formData.password === staticCredentials.password
    ) {
      setTimeout(() => {
        setIsSubmitting(false);
        // Navigate to Dashboard after successful login
        navigation.navigate("Dashboard");
      }, 1000);
    } else {
      setIsSubmitting(false);
      alert("Invalid credentials");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {({ navigation }) => (
            <LoginLayout>
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require("./assets/logo.png")}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.title}>Log in</Text>
                <View style={styles.form}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => setData("email", text)}
                  />

                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(text) => setData("password", text)}
                  />

                  <TouchableOpacity
                    style={[
                      styles.button,
                      isSubmitting && styles.disabledButton,
                    ]}
                    onPress={() => handleLogin(navigation)}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? "Logging in..." : "Log in"}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.signupContainer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                      onPress={() => console.log("Navigate to register")}
                    >
                      <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.footer}>
                  Ai-Timan: Streamlining Outpatient Care
                </Text>
              </View>
            </LoginLayout>
          )}
        </Stack.Screen>

        {/* Define the Dashboard screen only once */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#a1a1aa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 20,
  },
});

export default App;
