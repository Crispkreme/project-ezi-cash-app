import { StyleSheet } from "react-native";

export const colors = {
  primary: '#00113f',
  primaryBg: '#faf9f9'
}

export const __gstyles__ = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
  },
  input: {
    height: 50
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
})