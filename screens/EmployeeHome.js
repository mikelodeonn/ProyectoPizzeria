import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { CommonActions } from "@react-navigation/native";

export default function EmployeeHome({ navigation }) {

  const handleExit = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const backgroundImage = require("../assets/images/pizza2.jpg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.card}>

            <Text style={styles.title}>Panel de Empleado</Text>
            <Text style={styles.subtitle}>Gestiona las órdenes</Text>

            {/* CREAR ORDEN */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Order")}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>Crear Orden</Text>
            </TouchableOpacity>

            {/* VER ORDENES */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Orders")}
            >
              <Ionicons name="receipt" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>Ver Órdenes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exitButton}
              onPress={handleExit}
            >
              <Text style={styles.exitText}>EXIT</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "rgba(11, 69, 77, 0.55)",
    borderRadius: 20,
    padding: 30,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 8,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 15,
    gap: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  exitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 6,
  },

  exitText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});