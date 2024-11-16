import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function LoginLayout({ children }) {
  const menuItems = [
    { text: "About us", href: "#" },
    { text: "Services", href: "#" },
    { text: "Contact us", href: "#" },
    { text: "Login", href: "#" },
    { text: "Signup", href: "#" },
  ];

  return (
    <View style={styles.container}>
      {/* Navigation Menu */}
      <View style={styles.nav}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log(`Navigating to ${item.href}`);
            }}
          >
            <Text style={styles.navLink}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <ScrollView>{children}</ScrollView>
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          <View style={styles.contentWrapper}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>LAPAY, BHW</Text>
            </View>
            <Image
              source={require("../../assets/dashboard.svg")}
              style={styles.dashboardImage}
            />
            <View style={styles.circleBackgroundLarge} />
            <View style={styles.circleBackgroundSmall} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
  },
  nav: {
    position: "absolute",
    width: "100%",
    zIndex: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    gap: 16,
  },
  navLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 8,
    textDecorationLine: "underline",
  },
  main: {
    flex: 1,
    flexDirection: "row",
  },
  leftSection: {
    flex: 1,
    minHeight: "100%",
    zIndex: 50,
    padding: 16,
  },
  rightSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  contentWrapper: {
    position: "relative",
    width: "100%",
  },
  tagContainer: {
    position: "absolute",
    right: 0,
    bottom: 80,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#94D5EA",
    borderRadius: 100,
    zIndex: 50,
  },
  tagText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  dashboardImage: {
    position: "absolute",
    zIndex: 30,
    left: 64,
    top: 64,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  circleBackgroundLarge: {
    position: "absolute",
    bottom: 128,
    left: -200,
    width: 600,
    height: 600,
    backgroundColor: "#94D5EA",
    borderRadius: 300,
  },
  circleBackgroundSmall: {
    position: "absolute",
    top: 128,
    left: 64,
    width: 500,
    height: 500,
    backgroundColor: "#226185",
    borderRadius: 250,
  },
});
