import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground
} from "react-native";

import { saveOrder } from "../utils/storage";
import { COLORS } from "../theme/colors";
import { Picker } from "@react-native-picker/picker";
import { menu, sizes } from "../data/menuData";
import { CommonActions } from "@react-navigation/native";

export default function OrderScreen({ navigation }) {

  const [pizza, setPizza] = useState(menu[0].id);
  const [size, setSize] = useState(sizes[0].name);
  const [quantity, setQuantity] = useState("1");

  const handleExit = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const handleCreateOrder = async () => {

    const qty = parseInt(quantity);


    if (isNaN(qty) || qty <= 0) {
      Alert.alert("Error", "La cantidad debe ser mayor que 0");
      return;
    }

    if (qty > 10) {
      Alert.alert("Error", "Máximo 10 pizzas por orden");
      return;
    }

    const selectedPizza = menu.find(p => p.id === pizza);
    const selectedSize = sizes.find(s => s.name === size);

    const price =
      selectedPizza.basePrice *
      selectedSize.multiplier *
      qty;

    const newOrder = {
      id: Date.now().toString(),
      pizza: selectedPizza.name,
      size: selectedSize.name,
      quantity: qty,
      price: price,
      date: new Date().toLocaleString()
    };

    await saveOrder(newOrder);

    Alert.alert("Éxito", "Orden creada correctamente");

    navigation.replace("MainMenu");
  };

  return (
    <ImageBackground
      source={require("../assets/images/pizza.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <View style={styles.card}>

          <Text style={styles.title}>Crear Orden</Text>
          <Text style={styles.subtitle}>Selecciona tu pizza</Text>

          {/* PIZZA */}

          <Text style={styles.label}>Tipo de Pizza</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={pizza}
              onValueChange={(itemValue) => setPizza(itemValue)}
              dropdownIconColor="white"
              style={styles.picker}
            >
              {menu.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.name}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>

          {/* SIZE */}

          <Text style={styles.label}>Tamaño</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={size}
              onValueChange={(itemValue) => setSize(itemValue)}
              dropdownIconColor="white"
              style={styles.picker}
            >
              {sizes.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.name}
                  value={item.name}
                />
              ))}
            </Picker>
          </View>

          {/* QUANTITY */}

          <Text style={styles.label}>Cantidad</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej: 2"
            placeholderTextColor="#aaa"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          {/* BUTTON */}

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateOrder}
          >
            <Text style={styles.buttonText}>Enviar Orden</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exitButton}
            onPress={handleExit}
          >
            <Text style={styles.exitText}>EXIT</Text>
          </TouchableOpacity>

        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(11,69,77,0.65)",
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 6
  },

  subtitle: {
    color: "#ddd",
    marginBottom: 20
  },

  label: {
    color: COLORS.white,
    marginBottom: 5,
    fontWeight: "600"
  },

  pickerContainer: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    marginBottom: 15
  },

  picker: {
    color: "white"
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    color: "white",
    fontSize: 16
  },

  button: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  exitButton: {
    marginTop: 20,
    alignItems: "center"
  },

  exitText: {
    color: COLORS.primary,
    fontWeight: "bold"
  }

});