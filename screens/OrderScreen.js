import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { saveOrder } from "../storage/storage";

export default function OrderScreen({ navigation }) {
  const [pizza, setPizza] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleCreateOrder = async () => {
    if (!pizza.trim() || !quantity) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      pizza: pizza.trim(),
      quantity: parseInt(quantity),
      date: new Date().toLocaleString(),
    };

    await saveOrder(newOrder);

    Alert.alert("Éxito", "Orden creada correctamente");

    navigation.navigate("Orders");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Orden 🍕</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la pizza"
        value={pizza}
        onChangeText={setPizza}
      />

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateOrder}
      >
        <Text style={styles.buttonText}>Enviar Orden</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.exitText}>EXIT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#d35400",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  exitButton: {
    marginTop: 20,
    alignItems: "center",
  },
  exitText: {
    color: "red",
    fontWeight: "bold",
  },
});