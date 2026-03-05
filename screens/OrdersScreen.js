import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground
} from "react-native";

import { getOrders } from "../utils/storage";

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

  return (
    <ImageBackground
      source={require("../assets/images/pizza.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>

        <Text style={styles.title}>Órdenes</Text>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <View style={styles.card}>

              <Text style={styles.pizza}>
                {item.pizza}
              </Text>

              <Text style={styles.quantity}>
                Cantidad: {item.quantity}
              </Text>

              <Text style={styles.date}>
                {item.date}
              </Text>

            </View>

          )}
        />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background:{flex:1},

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.6)",
    padding:20
  },

  title:{
    fontSize:26,
    color:"white",
    fontWeight:"bold",
    marginBottom:20
  },

  card:{
    backgroundColor:"rgba(255,255,255,0.08)",
    padding:18,
    borderRadius:16,
    marginBottom:15,
    borderWidth:1,
    borderColor:"rgba(255,255,255,0.1)"
  },

  pizza:{
    fontSize:18,
    fontWeight:"bold",
    color:"white"
  },

  quantity:{
    color:"rgba(255,255,255,0.8)"
  },

  date:{
    marginTop:5,
    color:"#EBC317"
  }

});