import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";

import { getOrders, deleteOrder } from "../utils/storage";
import { COLORS } from "../theme/colors";
import { CommonActions } from "@react-navigation/native";

export default function OrdersScreen({ navigation }) {

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadOrders);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {

    Alert.alert(
      "Eliminar orden",
      "¿Seguro que quieres eliminar esta orden?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            await deleteOrder(id);
            loadOrders();
          }
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/pizza2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <Text style={styles.title}>Órdenes</Text>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay órdenes registradas</Text>
          }
          renderItem={({ item }) => (

            <View style={styles.card}>

              <Text style={styles.pizza}>
                 {item.pizza}
              </Text>

              <Text style={styles.detail}>
                Tamaño: {item.size}
              </Text>

              <Text style={styles.detail}>
                Cantidad: {item.quantity}
              </Text>

              <Text style={styles.price}>
                Total: ${item.price}
              </Text>

              <Text style={styles.date}>
                {item.date}
              </Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteText}>
                  Eliminar Orden
                </Text>
              </TouchableOpacity>

            </View>

          )}
        />

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
    padding: 20
  },

  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20
  },

  empty: {
    color: "white",
    textAlign: "center",
    marginTop: 50,
    opacity: 0.7
  },

  card: {
    backgroundColor: "rgba(11,69,77,0.65)",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)"
  },

  pizza: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white
  },

  detail: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 3
  },

  price: {
    marginTop: 6,
    fontWeight: "bold",
    color: COLORS.primary
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.warning
  },

  deleteButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  deleteText: {
    color: "white",
    fontWeight: "bold"
  }

});