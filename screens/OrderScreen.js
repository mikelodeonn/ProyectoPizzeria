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
      date: new Date().toLocaleString()
    };

    await saveOrder(newOrder);

    Alert.alert("Éxito", "Orden creada correctamente");

    setPizza("");
    setQuantity("");

    navigation.navigate("Orders");
  };

  return (
    <ImageBackground
      source={require("../assets/images/pizza.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>

        <View style={styles.card}>

          <Text style={styles.title}>Crear Orden 🍕</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de la pizza"
            placeholderTextColor="#aaa"
            value={pizza}
            onChangeText={setPizza}
          />

          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor="#aaa"
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

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background:{flex:1},

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.6)",
    justifyContent:"center",
    alignItems:"center",
    padding:20
  },

  card:{
    width:"100%",
    backgroundColor:"rgba(255,255,255,0.08)",
    padding:25,
    borderRadius:18,
    borderWidth:1,
    borderColor:"rgba(255,255,255,0.15)"
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    color:"white",
    marginBottom:20
  },

  input:{
    backgroundColor:"rgba(255,255,255,0.1)",
    padding:12,
    borderRadius:10,
    marginBottom:15,
    color:"white"
  },

  button:{
    backgroundColor:"#3DB296",
    padding:15,
    borderRadius:10,
    alignItems:"center"
  },

  buttonText:{
    color:"white",
    fontWeight:"bold"
  },

  exitButton:{
    marginTop:20,
    alignItems:"center"
  },

  exitText:{
    color:"#E4523B",
    fontWeight:"bold"
  }

});